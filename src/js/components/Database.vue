<template>
	<div>
		<b-field grouped position="is-right" >
		<b-input 
			v-model="search"
			placeholder="Ieškok..."
			type="search"
			icon="magnify"
			:expanded="isSearching"
			@focus="searchField(true)"
			@blur="searchField(false)">
		</b-input>
		</b-field>

	    <b-table
	        :data="dbtable"
	        :bordered="false"
	        :striped="true"
	        :narrowed="false"
	        :hoverable="true"
	        :loading="isLoading"
	        :mobile-cards="true"
	        :paginated="true"
	        :per-page="10"
	        :default-sort-direction="'asc'"
	        default-sort="names[0]">

	        <template slot-scope="data">
	        	
	        	<b-table-column 
	        		width="25"
	        		v-for="(col, index) in names" 
	        		v-bind:label="displayNames[index] | capitalize" 
	        		v-bind:key="index" 
	        		v-bind:field="col"
	        		sortable
	        		v-html="$options.filters.linkify(data.row[col])">
	        	</b-table-column>
	        </template>

	        <template slot="footer">
        		Įrašai: {{ database ? database.length : '...' }}
	        </template>

	        <template slot="empty">
	            <section class="section">
	                <div class="content has-text-grey has-text-centered">
	                    <p>
	                        <b-icon
	                            icon="emoticon-tongue"
	                            size="is-large">
	                        </b-icon>
	                    </p>
	                    <p>Tuštoka...</p>
	                </div>
	            </section>
	        </template>
	    </b-table>
	</div>
</template>

<script>

	export default {
		name: 'database',
		props: {
			url: {
				type: String,
				required: true
			},
			columns: {
				type: Array,
				required: false,
				default: function() {
					return [];
				}
			}
		},
        data() {
            return {
            	search: '',
            	searchColumn: null,
            	names: [],
            	displayNames: [],
            	database: [],
                isLoading: true,
                isSearching: false,
            }
        },
        mounted() {
        	this.fetchData();
        },
        methods: {
        	fetchData() {		
		    	let self = this;
				// Set to loading
				self.isLoading = true;

				let parseData = function(data, names) {
					// Clean current database, dups not wanted here
					self.database = [];
					// Make a clean database
					function parse(entry) {
						let tmp = {};
						for (let i in names) tmp[names[i]] = entry['gsx$' + names[i] ]['$t'];
						return tmp;
					}
					// Parse each entry
					for (let entry of data) {
						self.database.push(parse(entry));
					};
				};

				fetch(this.url).then(function(res) {
				  return res.json();
				}).then(function(res){

				  	// Find out what columns we have
			  		const names = Object.keys( res.feed['entry'][0] )
			  					.filter( key => /gsx\$/.test(key) )
			  					.map( name => name.replace('gsx\$','') );
			  		self.names = names;

				  	// Determine whether we've column names for displaying or fallback to real ones
				  	self.columns.length ? self.displayNames = self.columns : self.displayNames = names;


			  		//Make a proper database 
				  	parseData(res.feed['entry'], names);

				  	// Finish loading
					self.isLoading = false;
				});

        	},
        	searchField(state = false) {
        		state ? this.isSearching = state : this.search == '' ? this.isSearching = false : true;
        	}   	    	
        },
        computed: {
        	dbtable () {
        		return this.search === null ? this.database : this.database.filter( obj => JSON.stringify(obj).toLowerCase().indexOf(this.search.toLowerCase()) !== -1 )
		 	}
        },
        filters: {
			capitalize: function (value) {
			if (!value) return ''
				value = value.toString()
				return value.charAt(0).toUpperCase() + value.slice(1)
			},
			linkify: function(text) {
			    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			    return text.replace(urlRegex, function(url) {
			        return '<a href="' + url + '" target="_blank" rel="noopener">\n<span class="icon has-text-primary">\n<i class="mdi mdi-open-in-new"></i>\n</span>\n</a>';
			        return url;
			    });
			},
			truncate(value, length = 70) {
                return value.length > length
                    ? value.substr(0, length) + '...'
                    : value
            }
		}
    }
</script>