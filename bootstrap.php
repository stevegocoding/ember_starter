if (!defined('__DIR__')) {
   define('__DIR__', dirname(__FILE__));
}
define('ROOT_PATH'  , __DIR__.'/');
define('VENDOR_PATH', __DIR__.'/vendor/');
define('APP_PATH'   , __DIR__.'/app/');
define('PUBLIC_PATH', __DIR__.'/public/');

require VENDOR_PATH.'autoload.php';

$app = new \Slim\Slim();

$app->get('/tasks', function() use ($app) {
  
  $app->response()->header()->('Content-Type', 'application/json');
});

$app->get('/projects', function() use ($app) {
  
  $app->response()->header()->('Content-Type', 'application/json');
});



return $app;
