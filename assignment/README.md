# Documentation

This is sample express application created for the following tasks:

1. To Upload Excel (xls, xlsx) files.
2. To create a new documents for each tuple in the database.
3. To view the user records [name, mobile(unique), email]
    records with duplicate mobile numbers are not created.
4. To edit the user records one by one (at a time by id).
5. To delete the individual records by clicking delete button on the view page
6. while uploading the custom option is available to see only xlsx & xls file for option

# Major Technology Used:

1. Express(ejs) & Bootstrap
2. mlab for mongodb database

# Known Issues:

1. Not desinged mobile responsive
2. Application fails after sending a response to the screen 
    if uploaded a different file other than excel ( yet to write exception for it).
3. observed some timeout issues while connecting to mlab
    in that case throws error & unexpected event

# How to use the application:
if tasting on localhost:
    After starting the app
    1. please visit localhost:3000/usersdetails
    2. for uploading the file please navigate 
       from menu - upload 
    3. for editing & deleting please click the
       respective buttons infront the individual 
       records

# Note: Screenshots for the pages are in screenshots folder