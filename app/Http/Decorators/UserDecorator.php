<?php
namespace App\Http\Decorators;
use App\Http\Decorators\Decorator;

class UserDecorator extends Decorator {
  public function fullname(){
    return $this->model->name;
  }
}
