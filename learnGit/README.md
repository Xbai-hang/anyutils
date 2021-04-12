## About

This folder will submit some files and directories when learning Git with Mr. Liao Xuefeng.

His blog is: <a href = "https://www.liaoxuefeng.com/wiki/896043488029600">blog</a>.

## Study

### `Some easy command:`

- `git init `：Init your working directory.

- `git add ${fileName}`：Add your documents to the staging area.

- `git commit -m '${description}'`：Add file to version Library.

- `git status`：View the current status of the repository.

- `git diff ${fileName}`：View the differences of files `fileName`.

- `git log`：View the log you commit.
    it has some options，such as `--pretty=oneline`.

    ```sh
    git log --pretty=oneline
    # it can view the log in logs on one line
    ```

- `git reset --hard HEAD^`：

    ```shell
    git reset --hard HEAD^
    # A ^ represents a rollback of a version, such as HEAD^^ means rollback two versions
    
    git reset --hard commit_id
    # The commit_id is a very large number calculated by SHA1
    ```

    This is the diagram of this problem

    ```ascii
    ┌────┐
    │HEAD│
    └────┘
       │
       └──> ○ append GPL
            │
            ○ add distributed
            │
            ○ wrote a readme file
    ```

- `git reflog`：To record every command you give

