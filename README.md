# adenovirus-project


# Frontend

Firstly, go to the frontend directory.

For installinng dependencies:

  ### `yarn install`
  

For start the app:

 ### `yarn start`
 
It will start the app [http://localhost:3000](http://localhost:3000) in the browser. \

  
# Backend:

Go to root directory(where the manage.py file exist.) and then run 
  ### `{environmentpath}/python/bin runserver`  
  \
  
  environmentpath like : /yourusernname/adenovirus-project/viral-api-env
  
  


# creating superuser for accessing admin panel( [http://localhost:8000/admin] localhost:8000/admin):
  ### `{environmentPaTH}/python/bin createsuperuser`
  then enter your credentials.

# Available endpoints:



```http
GET api/viruses-hosts/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `virusFamily` | `string` | `Virus family such as adenovirus`|

i.e. http://localhost:8000/api/viruses-hosts/?virusFamily=adenovirus



```http
GET api/viruses/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `-` | `string` | ``|


```http
GET api/announcements/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `-` | `` | -|


```http
GET api/viral-infection-predicter-options/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `virusFamilt` | `string` | `returns available virus and host names`|


```http
POST api/ppi-predicter/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `virusSequenceFile,hostSequenceFile` | `string` | `it accepts .fasta files and returns predicter result on the server. it does not run locally.`|



```http
GET api/members/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `-` | `-` | `returns members data`|

```http
GET api/publications/
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `-` | `-` | `returns publications`|



## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
