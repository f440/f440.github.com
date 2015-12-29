FROM ruby:2.2.4
MAINTAINER f440 <f440@gmail.com>

RUN apt-get install make

WORKDIR /tmp
RUN curl -sL -o node.sh https://deb.nodesource.com/setup_5.x
RUN bash ./node.sh
RUN apt-get install nodejs -qq

ENV APP /app
RUN mkdir -p $APP
WORKDIR $APP

ADD Gemfile $APP
ADD Gemfile.lock $APP
RUN bundle install

ADD . $APP
RUN bundle install

CMD middleman build
