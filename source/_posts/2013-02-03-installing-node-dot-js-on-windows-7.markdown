---
layout: post
title: "Windows 上に node.js の開発環境を整える"
date: 2013-02-03 21:11
comments: false
categories: node.js windows
---

一身上の都合で Windows上に Node.js の開発環境を整えてる。そのときのメモ。

<!-- more -->

コマンドプロンプト起動:

    # Chocolatey のインストール
    @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('http://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin
    # システムドライブ直下にインストールするの微妙……
   
    # パッケージのダウンロード&インストール
    cinst nodejs.install
    # nodejs.install ではなく nodejs だけだとコマンドライン版プログラムだけ
    # インストールされる。別途 npm を用意する必要が出てくるので
    # パッケージを使った方が楽
   
    # Node.js にパスを通す
    set PATH=%PATH%;%ProgramFiles(x86)%\nodejs

    # ちゃんと動くかどうか、試しに grunt をインストールしてみる
    mkdir test
    cd test
    npm install grunt
   
あとは好みにあわせて開発ツールを `cinst` でインストールしていく

- バージョン管理 (git ...)
- エディタ (sublimetext2, vim ...)
- データストア (redis, mongodb ...)
- ユーティリティ (Gow, ...)

## 参考

- [node.js](http://nodejs.org/)
- [chocolatey](http://chocolatey.org/)
