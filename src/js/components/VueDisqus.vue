<template>
  <div id="disqus_thread" v-if="visibleComments"></div>
  <div v-else="visibleComments"> 
    <hr> 
    <button v-on:click="loadComments()" class="button is-link is-outlined" style="width: 15rem;height: 3rem;" :disabled="disabled">
      <span class="icon">
        <i class="mdi mdi-message"></i>
      </span>
      <span style="text-transform: uppercase;">Komentarai: {{ commentsCount }}</span>
    </button>
    <p v-show="disabled">Norint komentuoti reikalingas interneto ryšys.</p>
  </div>
</template>

<script>
  export default {
    name: 'vue-disqus',
    props: {
      shortname: {
        type: String,
        required: true
      },
      identifier: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      title: {
       type: String,
       required: false
      }
    },
    data () {
      return {
        visibleComments: false,
        commentsCount: 0,
        disabled: false,
        api_key: process.env.MIX_DISQUS_PUBLIC_KEY,
      }
    },
    mounted () {
      if (window.DISQUS) {
        this.reset(window.DISQUS);
        return;
      }
      // Nice idea, doesn't work | causes, however, duplicate exec if button clicked
      // this.init(10000)
      // window.addEventListener('load', this.count(), {passive: true, once: true});

      // Show counter if online
      if (navigator.onLine) { 
        this.count();
      } else {
          this.disabled = true;
          this.commentsCount = '?';
          // On back online allow comments
          window.addEventListener('online', () => {
            this.disabled = false;
            this.count();
          }, {passive: true, once: true});
      }
    },
    methods: {
      loadComments () {
        if (!navigator.onLine) return this.disabled=true;
        this.visibleComments = true;
        this.init();
      },
      reset (dsq) {
        const self = this
        dsq.reset({
          reload: true,
          config: function () {
            this.page.identifier = (self.identifier || self.$route.path || window.location.pathname)
            this.page.url = (self.url || self.$el.baseURI)
            if (self.title){
              this.page.title = self.title;
            }
            if (self.key){
              this.page.api_key = self.key;
            }
          }
        })
      },
      count () {
        if (!this.api_key) return;
        setTimeout(() => {
          let self = this;
          let url = "https://disqus.com/api/3.0/threads/set.json?api_key="+this.api_key+"&thread=ident:"+this.identifier+"&forum="+this.shortname;
          fetch(url).then(function(res) {
            return res.json();
          }).then(function(res){
            // If no comments, response array will be empty,
            if (! res['response'].length) return;
            self.commentsCount = res['response'][0]['posts'];
          }).catch(function(err) {
            console.warn("Error: ", err);
          });
        }, 150)
      },
      init (timeout=0) {
        const self = this
        window.disqus_config = function() {
          this.page.identifier = (self.identifier || self.$route.path || window.location.pathname)
          this.page.url = (self.url || self.$el.baseURI)
          if (self.title){
            this.page.title = self.title;
          }
          if (self.api_key){
            this.page.api_key = self.api_key;
          }
        }
        setTimeout(() => {
          this.visibleComments = true;
          let d = document
            , s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.setAttribute('id', 'embed-disqus')
          s.setAttribute('data-timestamp', +new Date())
          s.src = `//${this.shortname}.disqus.com/embed.js`
          ;(d.head || d.body).appendChild(s)
        }, timeout)
      }
    }
  }
</script>

<!-- Inspired by https://github.com/ktquez/vue-disqus -->
<!-- Based on https://disqus.com/api/docs/threads/set/ -->