<div id="sidebar" class="section">
	<div id="sidebar-content">
		<h2 style="padding-bottom: 5px">Welcome to Icewind Dale</h2>
		<hr />
		<p>
			Click markers to view more information about the location <br /><br />
			You can also hold the right key to pan and rotate the map <br /><br />
			Try out the elements in the corner to see what they do! <br /><br />
			Also, I've heard that easthaven looks really good from up close ;)
		</p>
	</div>
</div>

<style>
	.section {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: blanchedalmond;
	}

	#sidebar {
		/* visibility: hidden; */
		width: 100px;
	}

	@media (min-width: 600px) {
		#sidebar {
			visibility: visible;
			max-width: 700px;
			min-width: 300px;
			overflow: auto;
		}

		#sidebar-content {
			padding: 80px 50px 30px;
		}

		/* #sidebar:hover, :active, :focus {
	  flex:2
	}  */
	}
</style>
