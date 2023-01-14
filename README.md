# adenovirus-project



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
