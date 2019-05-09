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

表示されているメッセージのHTMLにid情報を追加
apiディレクトリおよびコントローラを作成
ルーティングを追加
messages/index.json.jbuilder
messages/create.json.jbuilder
message.js編集




var buildMessageHTML = function(message) {
      if (message.content && message.image.url) {
        var html =  `<div class="message" data-id="message.id">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          message.user_name
                        </div>
                        <div class="upper-message__date">
                          message.created_at
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          message.content
                        </p>
                        <img src="message.image.url"  class="lower-message__image" >
                      </div>
                    </div>`
      } else if (message.content) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-id='message.id'>
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          message.user_name
                        </div>
                        <div class="upper-message__date">
                          message.created_at
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          message.content
                        </p>
                      </div>
                    </div>`
      } else if (message.image.url) {
        //同様に、data-idが反映されるようにしている
        var html =  `<div class="message" data-id='message.id '>
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          message.user_name
                        </div>
                        <div class="upper-message__date">
                          message.created_at
                        </div>
                      </div>
                      <div class="lower-message">
                        <img src="' + message.image.url + '" class="lower-message__image" >
                      </div>
                    </div>`
      };
      return html;
    };