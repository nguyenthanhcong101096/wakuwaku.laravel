<?php

namespace App\Http\Queries;
use App\Http\Queries\Query;

class PostQuery extends Query{
  public function all(){
    return $this->model->all();
  }
}
