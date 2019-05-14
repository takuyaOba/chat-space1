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

css

問題
投稿を追加すると無限に下にいけてしまう
画面固定でスクロールさせたい

仮説
揃えるには
overflow:hidden;
padding-bottom: 10000px;
margin-bottom: -10000px;
と検索が出てきたが
引き伸ばしたい訳ではない

違った
position:sticky;

概念が理解できない


box-sizing: border-box;
    height: 100px;
    padding: 0 40px;
    position: fixed;
    width:calc(100% - 300px);