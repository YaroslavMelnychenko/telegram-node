<?php
namespace Deployer;

require 'recipe/npm.php';

// Project name
set('application', 'telegram-node');

// Project repository
set('repository', 'git@github.com:YaroslavMelnychenko/telegram-node.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', false);