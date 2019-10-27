<?php

namespace App\Http\Queries;
use Illuminate\Database\Eloquent\Model;

abstract class Query {

  protected $model;

  public function __construct(Model $model){
    return $this->model = $model;
  }
}
