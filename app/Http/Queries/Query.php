<?php

namespace App\Http\Queries;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

abstract class Query {

  protected $model;

  public function __construct(Collection $model){
    return $this->model = $model;
  }

  public function first(){
    return $this->model->first();
  }

  public function all(){
    return $this->model->all();
  }

  public function find($id){
    return $this->mode->find($id);
  }
}
