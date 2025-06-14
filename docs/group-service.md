# Group Service
## Context
User want to create a group allow his friends, family and others join for together discussion about posts which is the target of group.
## Usecase
### Common usecase for group
- Create group
- Get list groups(by keyword, by current user)
- Invite users to group
- Kick users(only inspector can do that)
- Delete group(only owner)
- Change role group to users
- get list users
- search users in group by keywords
- Update group setting: 
    - <b>Accept/Reject/Pending</b> post when users created it in group
        - When owner update auto mode is <b>True</b> => post will be accepted
        - Reject => that post will be removed from group bucket(place pending post)
        - Pending => is status when created new post in group when auto mode is <b>False</b>
        - Every posts along with groups have a attribute is disabled => pending then <b>disable = true</b> else <b>false</b>
    - <b>Accept/Reject/Pending</b> users want to join group
        - Flow for users join group similar post
## Database
As i written all service will be used mysql for storage data except ```friendship-service``` using ```neo4j```.
### Schema
- tbl_group: ```id, name, groupType('PUBLIC', 'PRIVATE'), createdAt, enableAutoAcceptMember(default = true), enableAutoReviewPost(default = true), enableNotificationWhenUserRequest(default = true), enableNotificationWhenNewPostComing(default = true)```.
    - Explain: 
        - enableAutoAcceptMember: auto accept users when they requested to join group
        - enableAutoReviewPost: auto accept posts in group
        - enableNotificationWhenUserRequest: always notify to inspectors of groups when a new user requested to join group(only work when ```enableAutoAcceptMember``` is ```false```)
        - enableNotificationWhenNewPostComing: always notify to inspectors of groups when a new post is created then they need to accept/reject(only work when ```enableAutoReviewPost``` is ```false```)