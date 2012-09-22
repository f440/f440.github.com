---
layout: post
title: "TumblerからOctopressへの移行"
date: 2012-09-22 17:28
comments: true
categories: 
- octopress
---

Tumblerでブログ書いていたけど、ローカルで記事書く => フォームに貼り付け => 
プレビューのサイクルが結構面倒くさいな、と常々思っていたので、Octopressに移行した。

ホスティングには [Github Pages][] を利用している。

##  手順

    $ git clone git://github.com/imathis/octopress.git octopress

    # テーマ入れ替える    
    $ git clone git://github.com/tommy351/Octopress-Theme-Slash.git .themes/slash
    $ rake 'install[slash]' # zsh だとクォートなりエスケープするなりしないと、[, ] がメタ文字として解釈される
    # .themes/slash/{source,sass} がルートディレクトリにコピーされる
    
このままだと header の canonical が設定されないかったので、同梱テンプレート `.themes/classic/source/_includes/head.html` を参考に `./source/_includes/head.html` をちょっとといじった。
    
[ブログの過去記事](http://tsurayogoshi.tumblr.com/archive)を全部インポートする ( 参考: [Goodbye Tumblr. Hello, Octopress Powered by Jekyll and Markdown!](http://blog.assimov.net/blog/2012/03/24/tumblr-to-octopress-powered-by-jekyll-and-markdown/))

    
    $ wget -O source/tumblr.rb https://raw.github.com/stephenmcd/jekyll/master/lib/jekyll/migrators/tumblr.rb
    $ vim source/tumblr.rb # format="md" => format="markdown" に書き換え
    $ ruby -rubygems -e 'require "./source/tumblr"; Jekyll::Tumblr.process("http://tsurayogoshi.tumblr.com", format="markdown", grab_images=true)'
    $ mv _posts/tumblr/* source/_posts/
    $ mv post source/

後は細かい調整

- 画像のパスが tumblr を参照しているので、全部ダウンロードして `source/images` 以下に
保存
- 記事のメタデータ部分
  - `comments: true`を追加
  - `tags` を `categories` に書き換え。
- 各種外部サイト向けパーツの設定

[Github Pages][] へのデプロイ方法は[公式の説明](http://octopress.org/docs/deploying/github/)を参照。

## 仕組み

`source` ディレクトリの中身が `public` 以下に展開されて、ここが公開領域となる。
`public` の中身が `_deploy` にコピーされて、ここが Github Pages に push される
。

git リポジトリのうち、`master` は公開用、`source` は編集用となる。つまり、ルー
トディレクトリに `source` ブランチ、`_master` ディレクトリに `maste` ブランチと
いう二つのリポジトリが配置されることになる。

## 感想

vim で書く => すぐに確認 => github にデプロイ => 公開の流れは気持ちいい。tumblr の頃と同じく、markdown で書けるのもとても具合がいい。

[Github Pages]: http://pages.github.com/
