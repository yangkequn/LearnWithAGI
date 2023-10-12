To release a built React Next.js app to GitHub Pages, you can follow these general steps:

Create a GitHub Repository:
If you haven't already, create a new GitHub repository where you want to host your Next.js app.

Set Up Your Next.js App:
Make sure your Next.js app is set up and ready to be built. You can use the following command to build your app:

bash
Copy code
npm run build
This command will create a ./out directory with the optimized production build of your app.

Create a gh-pages Branch:
You'll need a separate branch to publish your app to GitHub Pages. You can create a new branch named gh-pages:

bash
Copy code
git checkout -b gh-pages
Add a .nojekyll File:
Create an empty file named .nojekyll in the root directory of your repository. This file tells GitHub Pages not to use Jekyll, which is the default static site generator for GitHub Pages.

Commit and Push to GitHub:
Add all the built files to your branch and commit your changes:

bash
Copy code
git add .
git commit -m "Add built files for GitHub Pages"
git push origin gh-pages
Set Up GitHub Pages in Repository Settings:

Go to your GitHub repository's Settings.
Scroll down to the GitHub Pages section.
Set the Source to the gh-pages branch.
Access Your Deployed App:
GitHub Pages will now automatically deploy your app. It might take a few minutes for the changes to propagate. Once it's deployed, you can access your app using the URL specified in the GitHub Pages settings.

Remember that GitHub Pages uses the gh-pages branch for hosting, so make sure you don't have sensitive information in that branch, and only push the built files and necessary assets to it.

Keep in mind that these are general steps, and you might need to adjust them based on your specific project structure and dependencies. Additionally, GitHub Pages may have evolved since my last knowledge update in September 2021, so it's a good idea to refer to GitHub's official documentation for the latest instructions if needed.