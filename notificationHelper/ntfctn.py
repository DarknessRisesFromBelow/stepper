import time
import requests

def requestMsgSending():
	while(True):
		requests.get("https://localhost/sendMsg", verify=False)
		time.sleep(3600)

requestMsgSending()