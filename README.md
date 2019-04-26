# README

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
