<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class DecoratorsProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->decoratorModel();
        $this->decoratorModels();
    }

    public function decoratorModel(){
        Builder::macro('decorator', function ($class){
            return new $class($this->model);
        });
    }

    public function decoratorModels(){
        Collection::macro('decorator', function ($class){
            return $this->map(function ($model) use ($class){
                return new $class($model);
            });
        });
    }
}
