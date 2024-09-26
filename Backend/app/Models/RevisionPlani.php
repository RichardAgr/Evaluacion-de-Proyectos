<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevisionPlani extends Model
{
    use HasFactory;
    
    protected $table = 'revisionplani';

    protected $fillable =[
        'idPlanificacion','nota','comentario','idDocente'
    ];
    public $timestamps = false;
}
