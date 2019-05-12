# READM

## users テーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true,index:true|
|email|string|null: false, foreign_key: true|

### Association
- has_meny :groups through:members
- has_meny :messages
- has_meny :members

## groups テーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, foreign_key: true|

### Association
- has_meny :users through:members
- has_meny :messages
- has_meny :members

## message テーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string| |
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## members テーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

chat-space
自動更新機能を実装

・現在
表示されているメッセージのHTMLにid情報を追加
メッセージを更新するためのアクションを実装
apiディレクトリおよびコントローラを作成
追加したアクションを動かすためのルーティングを実装
app/views/api/messages/index.json.jbuilder 追記
views/messages/create.json.jbuilder 追記
message.js 編集

・困ってる事

$.ajax 内の url: が上手く繋がらない
ルーティングエラー

・仮説と検証

コンソールで　rake routes　から /groups/:group_id/api/messages(.:format) を使うと仮説を立てる
  #{group_id} に書き換える？
  どうやって値を渡すのか
  コントローラから渡す　上手くいかない？
  jbuilderから引数の形で渡せる？　doneに返すから無理？
  そもそもurl:の記述がおかしい？　別回答が浮かばない
  全然違う事してる？

複数回見直しているが改善策が浮かばない



1.表示されているメッセージのHTMLにid情報を追加
2.メッセージを更新するためのアクションを実装
3.追加したアクションを動かすためのルーティングを実装
4.追加したアクションをリクエストするよう実装

