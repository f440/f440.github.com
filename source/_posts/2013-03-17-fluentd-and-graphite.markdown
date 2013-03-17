---
layout: post
title: "Fluentd で Graphite 使うときのTips"
date: 2013-03-17 15:50
comments: true
categories: fluentd graphite visualization
---

[fluent-plugin-graphite] 使うときのメモ。

Ops界隈での可視化というと、ここ何年かは[Graphite]でグラフを作ってそれを他のツールで表示する、みたいなのが多い。[Fluentd]のデータを可視化したい場合は[GrowthForecast]が使われることが多いけど、[Graphite]使ってみるといろんなツールと組み合わせられておもしろい。

<!-- more -->

[Fluent-plugin-graphite] 使えば簡単に実現できそうなんだけど、`:key` とか `:count` とかのインターフェースに合わせてデータを整形しておく必要がある。

こういうキーの調整は out\_map を使うと調整できる。

    <source>
      type tail
      format apache
      path /var/log/httpd/access_log
      tag apache.access
    </source>
    <match apache.access>
      type map
      map [["graphite." + tag, time, {"key" => "graphite.apache.accesslog.code." + record["code"], "count" => 1}]]
      multi true
    </match>
    <match graphite.**>
      type graphite
    </match>

[Fluentd]: http://fluentd.org/
[Graphite]: http://graphite.wikidot.com/
[GrowthForecast]: http://kazeburo.github.com/GrowthForecast/
[fluent-plugin-graphite]: https://github.com/hotchpotch/fluent-plugin-graphite
