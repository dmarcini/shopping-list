import * as React from "react";

import "./Home.css";

function Home() {
  return (
    <main id="home">
      <p id="app-description">
        <h1>Welcome to Shopping Lists Manager website!</h1>
        <span>
        The following are basic information about the functionality
        of the application and how to use it. Feel free to read them!
        </span>
        <span>
          This application doesn't need any registration and login.
          All the lists you create will be saved in your browser memory.
        </span>
        <span>
          Creating lists with this application is very quick and simple.
          All what you need is click on <strong>SHOPPING LISTS</strong> menu
          item and create your first list!
        </span>
        <span>
          When the first list is created you can manage them by
          adding next items and marking purchased items.
        </span>
        <span>
          When you will find  the list will not be useful any more,
          you can remove it.
          After that the list is moved to a refuse bin
          and delete after 30 days from that time. But before that time is up
          you can recover any list you wish.
        </span>
        <span>
          You can freely manage your lists by:
          <ul id="list-functionality">
            <li>Adding new lists</li>
            <li>Removal of specific lists</li>
            <li>Retrive a removed lists</li>
            <li>Rename lists</li>
            <li>Add items to lists</li>
            <li>Update the items in the lists</li>
            <li>Mark purchased items</li>
          </ul>
        </span>
        <span>
        Create as many shopping lists as you want, very fast and very easy!
        </span>
      </p>
    </main>
  );
}

export default Home;
