# Warning:
# Use http even if accessing https, replit proxy handles https connection

# Encrypt
#curl -v -k -X POST \
#  http://localhost:3000/encrypt \
#  -H 'Authorization: Bearer WRONGTOKEN' \
#  -H 'Content-Type: application/json' \
#  -d '{
#        "key": "mysharedkey",
#        "data": "hello world"
#      }'

TOKEN='BPmNB3+ngfs9vjUHdghftJq+DwfJ9fZz5GTIqNcDLxg='
KEY='10ad65a954d5e5cf'
curl -s -k -X POST \
  http://localhost:3000/encrypt \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
        "key": "10ad65a954d5e5cf",
        "data": "hello world"
      }'
echo 

curl -s -k -X POST \
  http://localhost:3000/decrypt \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
        "key": "10ad65a954d5e5cf",
        "data": "esm54hb4hbb"
      }'
echo 

curl -s -k -X POST \
  http://localhost:3000/encrypt/email \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
        "key": "10ad65a954d5e5cf",
        "data": "john.doe@email.com"
      }'
echo 

curl -s -k -X POST \
  http://localhost:3000/decrypt/email \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
        "key": "10ad65a954d5e5cf",
        "data": "t3ga90t8@491tpj1k5"
      }'
echo 

curl -s -k -X POST \
  http://localhost:3000/encrypt/cc \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
        "key": "10ad65a954d5e5cf",
        "data": "ZZZ"
      }'
echo 

curl -s -k -X POST \
  http://localhost:3000/encrypt/cc \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
        "key": "10ad65a954d5e5cf",
        "data": "1234-5678-1234-5678"
      }'
echo 

curl -s -k -X POST \
  http://localhost:3000/decrypt/cc \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
        "key": "10ad65a954d5e5cf",
        "data": "4971-0028-9066-1285"
      }'
echo 


#curl -k http://localhost:3000/random/16 \
#  -H "Authorization: Bearer $TOKEN" \
#  -H 'Content-Type: application/json' \

  