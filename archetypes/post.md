+++
title 				= "{{ replace .TranslationBaseName "-" " " | title }}"
date 				= "{{ .Date }}"

url					= ""
slug                = "{{ .File.BaseFileName }}"
disqus_identifier   = "{{ now.Unix }}"

draft				= true
comments 			= true

kategorijos         = ["cat1", "cat2"]
temos      	        = ["x", "y"]

summary 			= ""
subtitle 			= ""

images              = [
    "",
    "",
]
+++