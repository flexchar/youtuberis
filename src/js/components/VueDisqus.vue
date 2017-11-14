<template>
  <div id="disqus_thread" v-if="visibleComments"></div>
  <button v-else="visibleComments" v-on:click="loadComments()" class="button is-dark is-outlined" style="width: 15rem;height: 3rem;">
    <span class="icon">
      <i class="material-icons">chat_bubble_outline</i>
    </span>
    <span style="text-transform: uppercase;">Komentarai: {{ commentsCount }}</span>
  </button>
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
      },
      remote_auth_s3: {
       type: String,
       required: false
      },
      api_key: {
       type: String,
       required: true
      },
      sso_config: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        visibleComments: false,
        commentsCount: 0
      }
    },
    mounted () {
      if (window.DISQUS) {
        this.reset(window.DISQUS)
        return
      }
      // Nice idea, doesn't work | causes, however, duplicate exec if button clicked
      // this.init(10000)
      // window.addEventListener('load', this.count());
      this.count();
    },
    methods: {
      loadComments () {
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
            if (self.remote_auth_s3){
              this.page.remote_auth_s3 = self.remote_auth_s3;
            }
            if (self.key){
              this.page.api_key = self.key;
            }
            if (self.sso_config){
              this.sso = self.sso_config;
            }
          }
        })
      },
      count () {
        if (!this.api_key) return;
        setTimeout(() => {
          var self = this;
          var url = "https://disqus.com/api/3.0/threads/set.json?api_key="+this.api_key+"&thread=ident:"+this.identifier+"&forum="+this.shortname;
          fetch(url).then(function(res) {
            return res.json();
          }).then(function(res){
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
          if (self.remote_auth_s3){
            this.page.remote_auth_s3 = self.remote_auth_s3;
          }
          if (self.api_key){
            this.page.api_key = self.api_key;
          }
          if (self.sso_config){
            this.sso = self.sso_config;
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

<!-- https://github.com/ktquez/vue-disqus -->
<!-- https://disqus.com/api/docs/threads/set/ -->