+++
title 				= "{{ replace .TranslationBaseName "-" " " | title }}"
date 				= "{{ .Date }}"

url					= ""
slug                = "{{ .File.BaseFileName }}"
disqus_identifier   = "{{ now.Unix }}"

draft				= true
comments 			= false
+++