<?php

namespace App\Http\Decorators;
use Illuminate\Database\Eloquent\Model;

abstract class Decorator {
  protected $model;

  public function __construct(Model $model){
    $this->model = $model;
  }

  public function __call($method, $agrs){
    return call_user_func_array([$this->model, $method], $args);
  }

  public function __get($name){
    return $this->model->name;
  }
}
