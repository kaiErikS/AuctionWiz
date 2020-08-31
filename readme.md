# DESCRIPTION

This project is made from an react front-end and node/express web-api back-end(using in-memory objects that represent a dummy database).

The application is a dummy auction website where you can bid on or sell items. The focus has
been on the back-end, and therefore must of the functionality has been implemented there.
The main functionality is:

- Authentication/authorization.
- Session based cookies.
- POST, PUT, GET and DELETE endpoints.
- Tests(Jest and enzyme)

# INSTRUCTIONS:

To start the application run "yarn install" and then "yarn dev" in the command line
from the root directory.
The application can then be accessed at http://localhost:8080/ in the browser.

The first page you will see is the login page, here you can click on register to create a new user.

On the main/home page you will see all auctions that are listed, with an option to bid on them.
If the buyout on the item is matched, then the item will be marked as sold.
On the "My auctions" page, you will se the items that you have posted, as well as an option to
either mark them as sold, or to delete them completely. The "New item" page provides the
ability to create new auctions.
There is an option to log out/in in the top right corner.
