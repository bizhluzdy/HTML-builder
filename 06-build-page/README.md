### Building an HTML Page from Components and Styles

In the **index.js** file in the **06-build-page** directory, write a script that:

1.  Creates a folder called **project-dist**.
2.  Replaces the template tags in the **template.html** file with the names of the files from the **components** folder (e.g., `{{section}}`) and saves the result in **project-dist/index.html**.
3.  Bundles the styles from the **styles** folder into a single file and puts it in **project-dist/style.css**.
4.  Copies the **assets** folder to **project-dist/assets**.

### General Rules:

-   The use of any external modules is prohibited.
-   Each task should be executed by running the command `node <task folder name>` in the root directory.
-   Synchronous fs functions such as `fs.statSync(path[, options])`, `fs.readFileSync(path[, options])`, and others listed under the [synchronous API](https://nodejs.org/api/fs.html#fs_synchronous_api) are not allowed.

### Requirements:

-   After running the script, a folder called **project-dist** should be created.
-   The **project-dist** folder should contain **index.html** and **style.css** files.
-   The **project-dist** folder should include the **assets** folder, which is an exact copy of the **assets** folder in the **06-build-page** directory.
-   The use of fsPromises.cp() is prohibited.
-   The **index.html** file should contain markup that results from replacing the template tags in the **template.html** file.
-   The **style.css** file should contain styles compiled from the files in the **styles** folder.
-   If a component is added to the folder and the corresponding tag is added to the **template.html** file, running the script again should update the **index.html** file in the **project-dist** folder, overwriting it. The **style.css** file and **assets** folder should also be kept up to date.
-   When writing consecutive template tags in the **template.html** file, separated only by spaces (without line breaks), there should be no runtime errors. For example, `{{about}} {{articles}}` should be treated as two separate components.
-   The original **template.html** file should not be modified during the execution of the script.
-   Writing the contents of any files other than those with the **.html** extension should result in an error.

### Objectives:

-   Building a small utility that allows for the assembly of a static HTML page.
-   Reinforcing the knowledge gained.

### Description:

Here is one possible order of execution for the tasks:

1.  Import all the required modules.
2.  Read and save the template file to a variable.
3.  Find all the tag names in the template file.
4.  Replace the template tags with the contents of the component files.
5.  Write the modified template to the **index.html** file in the **project-dist** folder.
6.  Use the script written in the **05-merge-styles** task to create the **style.css** file.
7.  Use the script from the **04-copy-directory** task to copy the **assets** folder to the **project-dist** folder.

Note that you can optimize and modify this algorithm as you see fit.
