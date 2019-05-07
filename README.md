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
メッセージ機能を非同期通信化しよう
9. HTMLを追加した分、メッセージ画面を下にスクロールする

・できている
非同期通信は出来ている
画面がリロードせずに投稿できている
テキストのみ/画像のみ/画像とテキスト、それぞれでエラーが出ずに投稿ができる
連続での投稿が可能
日時表記は適切



・問題点
投稿成功時に、animateメソッドの動作を期待するが、動作しない

エラーもなく、複数検索を行いanimateメソッドの記述には恐らく文法ミスはないと思われる
どこが原因でスクロールしないのか分からない

他に試したこと

インデントを揃える

gem 'turbolinks', '~> 5' の記載があるので、
$(document).on('turbolinks:load', function() { });を試すが効果を感じられない

ヘッダの記述を　true　から　reload　に変更　→　変化なし
= javascript_include_tag 'application', 'data-turbolinks-track': 'reload'

あまり有効な記述が見つからない

果たしてgemのせいなのか

そもそもgemを削除してしまえば読み込むのか
削除して良いか否か


