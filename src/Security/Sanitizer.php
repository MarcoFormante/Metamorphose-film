<?php

namespace App\Security;

use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use function PHPSTORM_META\map;

class Sanitizer extends AbstractController
{
   
    public function sanitize($value,string $type)
    {
        if (empty($value)) {
            return "";
        }
        switch($type){
            case "email":
                if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Invalid email");
                }
                return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                break;
            case "url":
                if (!filter_var($value, FILTER_VALIDATE_URL)) {
                    throw new Exception("Invalid URL");
                }
                return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                break;
            case "int":
                if (!filter_var($value, FILTER_VALIDATE_INT)) {
                    throw new Exception("Invalid Int");
                }
                return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                break;

            case "arrayString":
                if (!is_array($value)) {
                    throw new Exception("Invalid Array");
                }
                $array = [];
                foreach($value as $v){
                    
                    $array[] = [
                        "value1" => htmlspecialchars($v["value1"], ENT_QUOTES, 'UTF-8'),
                        "value2" => htmlspecialchars($v["value2"], ENT_QUOTES, 'UTF-8')
                    ];
                    
                }
                
                return json_encode($array);
                break;

            default:
                return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        }
       
    }
}