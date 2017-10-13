+++
title 				= "Muzika"
date 				= "2017-10-11T20:38:58+03:00"

url					= ""
slug                = ""
disqus_identifier   = "1507743538"

categories          = ["duk"]
tags      	        = ["x", "y"]

draft				= false
comments 			= false
+++

<button class="button is-primary" @click="show = !show"> <span v-bind:text="show?'true':'false'"></span> </button>
<div v-if="show" >
	<iframe src="https://open.spotify.com/embed/user/thevukaslt/playlist/6i2wbS74np0lDC4tXp7D9v" width="100%" style="height: 60vw; min-height: 300px;" frameborder="0" allowtransparency="true"></iframe>
</div>