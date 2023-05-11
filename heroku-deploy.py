import os
import shutil
import sys

FILE_PATH = os.path.dirname(os.path.realpath(__file__))


def init_deploy():
    shutil.rmtree(os.path.join(FILE_PATH, 'web'))


def copy_backend():
    shutil.copytree(
        os.path.join(FILE_PATH, 'backend'),
        os.path.join(FILE_PATH, 'web'),
        ignore=shutil.ignore_patterns('node_modules', '.env', 'db.json', '.eslintrc.js', 'tests'))


def build_frontend():
    os.system('cd client && npm run build')


def copy_build_folder():
    shutil.copytree(
        os.path.join(FILE_PATH, 'client', 'build'),
        os.path.join(FILE_PATH, 'web', 'build'))
    shutil.rmtree(os.path.join(FILE_PATH, 'client', 'build'))


def push_to_heroku():
    os.system('git add .')
    os.system('git commit -m "Commit from heroku-deploy.py for deployment"')
    os.system('git push origin master')
    os.system('git subtree push --prefix web heroku master')


def main():
    init_deploy()
    copy_backend()
    build_frontend()
    copy_build_folder()
    push_to_heroku()


if __name__ == "__main__":
    main()