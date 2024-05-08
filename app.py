from twikit import Client
from dotenv import load_dotenv
import os
import pickle
from datetime import datetime, timezone

load_dotenv()

client = Client("ja")
client.login(
    auth_info_1=os.environ["auth_info_1"],
    auth_info_2=os.environ["auth_info_2"],
    password=os.environ["password"],
)

# 前回の最新ツイート投稿日時を取得
try:
    with open("latest_tweet_time.pickle", "rb") as f:
        latest_tweet_time = pickle.load(f)
except FileNotFoundError:
    latest_tweet_time = None

# ツイートの検索 (前回の最新ツイート投稿日時以降のものを取得)
tweets = client.search_tweet("エンジェル戦記", "Latest", since=latest_tweet_time)

# 新しいツイートがあれば表示
if tweets:
    for tweet in tweets:
        print(tweet.text)
        print(tweet.created_at)

    # 最新ツイート投稿日時を保存
    with open("latest_tweet_time.pickle", "wb") as f:
        pickle.dump(tweets[-1].created_at, f)
