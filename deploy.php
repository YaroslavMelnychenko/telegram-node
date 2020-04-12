<?php
namespace Deployer;

require __DIR__ . '/vendor/autoload.php';

require 'recipe/common.php';
require 'recipe/npm.php';

// Project name
set('application', 'telegram-node');

// Project repository
set('repository', 'git@github.com:YaroslavMelnychenko/telegram-node.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', false); 

// Shared files/dirs between deploys 
set('shared_files', []);
set('shared_dirs', [
    'node_modules'
]);

// Writable dirs by web server 
set('writable_dirs', []);

// Set pm2
set('bin/pm2', function () {
    return run('which pm2');
});

// Hosts

host('amazon')
    ->user('deployer')
    ->configFile('~/.ssh/config')
    ->set('deploy_path', '/var/www/telegram.yaroslav-melnychenko.pp.ua'); 

// Tasks

// pm2 start
task('pm2:start', function () {
    run('{{ bin/pm2 }} start {{ release_path }}/bin/www -i max --name {{ application }}');
});

// pm2 start
task('pm2:stop', function () {
    run('{{ bin/pm2 }} stop {{ application }}');
});

// pm2 restart
task('pm2:restart', function () {
    run('{{ bin/pm2 }} stop {{ application }}');
    run('{{ bin/pm2 }} start {{ release_path }}/bin/www -i max --name {{ application }}');
});

desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'npm:install',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'pm2:restart',
    'success'
]);

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
