import urllib.request
url='http://127.0.0.1:8000/login'
req=urllib.request.Request(url, headers={'User-Agent':'python-urllib/3'})
with urllib.request.urlopen(req) as r:
    print('status', r.status)
    data=r.read(400)
    print(data[:400])
