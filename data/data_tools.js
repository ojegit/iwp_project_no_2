
	async function getQuery(url) {
		const response = await fetch(url,{
			method: "GET",
			headers: {"content-type":"application/json"}
		})
		if(!response.ok) {
			console.error('Response not OK! URL: '+url);
			return;
		}
		const data = await response.json()
		return data
	}

	async function getMap(url) {
        const res = await fetch(url); 
        return await res.json();
	}

	async function postQuery(url,jsonQuery) {
		const response = await fetch(url,{
			method: "POST", //"POST",
			headers: {"content-type":"application/json"},
			body: JSON.stringify(jsonQuery)
		})
		if(!response.ok) {
			console.error('Response not OK! URL: '+url+ ', QUERY: '+jsonQuery);
			return;
		}
		const data = await response.json()
		return data
	}


	function summaryStats2(data) {
		/*
		Calculates a bunch of summary statistics out of the 3d matrix, including
		min, max, mean, median. Null values are skipped.

		TBD: also add across all of the rows of the 3d matrix 
		*/
		const z = Object.keys(data);
		const x = Object.keys(data[z[0]]);
		const nz = z.length;
		const nx = x.length;
		const ny = data[z[0]][x[0]].length;

		const summary__ = [];

		for(var j = 0; j < ny; j++) { //Get col
			const col = [];
			const nnull = 0;
			for(var i = 0; i < nz; i++) { //Get z
				for(var k = 0; k < nx; k++) { //Get row
					const e = data[z[i]][x[k]][j];
					if (!(e === null)) { col.push(e); } else { nnull++; }
				}
			}

			//
			let csum = 0.0; //col sum
			col.forEach((s)=>{csum+=s;});
			let cmean = csum/(1.0*(ny*nz-nnull)); //row mean
				
			let cstd = 0.0;
			col.forEach((s)=>{cstd+=(s-cmean)*(s-cmean);});
			cstd = Math.sqrt(cstd/(1.0*(ny*nz-nnull-1))); //Bessel's correction

			let cmin = 1e10; //col min
			col.forEach((s)=>{ if(s < cmin) { cmin = s; }});
 
			let cmax = -1e10; //col max
			col.forEach((s)=>{ if(s > cmax) { cmax = s; }});
			const ccol = [];
			col.forEach((s) => { ccol.push(s); }); //copy
			ccol.sort();
			const nc = ccol.length;
			//row median
			let cmed;
			if (nc % 2 == 0) { //even
				cmed = 0.5*(ccol[nc/2-1] + ccol[nc/2+1-1]); 
			} else { //odd
				cmed = ccol[(nc+1)/2-1]; 
			}
			//

			//console.log([cmin, cmax, cmean, cmed, cstd]);
			summary__.push([cmin, cmax, cmean, cmed, cstd]);
		}	

		return summary__;
	}


	function getArrays(data, selIdx) {

		const z = Object.keys(data);
		const x = Object.keys(data[z[0]]);
		const nz = z.length;
		const nx = x.length;
		//const ny = data[z[0]][x[0]].length;
		const ny = selIdx.length
		let cols = [];
		for(var l = 0; l < ny; l++) { //Get col
			const j = selIdx[l];
			const col = []; 
			const nnull = 0;
			for(var i = 0; i < nz; i++) { //Get z
				for(var k = 0; k < nx; k++) { //Get row
					const e = data[z[i]][x[k]][j];
					if (!(e === null)) { col.push(e); } else { nnull++; }
				}
			}
			cols['col'+l] = {'values':col, 'nullCount':nnull};
		}
		return cols;
	}


	function summaryStats(data) {
		/*
		Calculates a bunch of summary statistics out of the 3d matrix, including
		min, max, mean, median. Null values are skipped.

		TBD: also add across all of the rows of the 3d matrix 
		*/
		const z = Object.keys(data);
		const x = Object.keys(data[z[0]]);
		const nz = z.length;
		const nx = x.length;
		const ny = data[z[0]][x[0]].length;

		const summary__ = [];
		//sum_labs = ['min','max','mean','median'];
		for(var i = 0; i < nz; i++) { //Get z
			const tmp = [];
			for(var j = 0; j < nx; j++) { //Get row
				const row = data[z[i]][x[j]];
				let nnull = 0;
				row.forEach((s)=>{
					if(s===null) {
						nnull++;
					}
				});
				let rsum = 0.0; //row sum
				row.forEach((s)=>{
					if(!(s==null)) {
						rsum+=s;
					}
				});
				let rmean = rsum/(1.0*(ny-nnull)); //row mean
				//const rmin = Math.min(row); //row min


				let rstd = 0.0; //row standard deviation
				row.forEach((s)=>{rstd+=(s-rmean)*(s-rmean);});
				rstd = Math.sqrt(rstd/(1.0*(ny-nnull-1))); //Bessel's correction

				let rmin = 1e10;
				row.forEach((s)=>{
					if(s < rmin && !(s===null)) {
						rmin = s;
					}
				});

				//const rmax = Math.max(row); //row max
				let rmax = -1e10;
				row.forEach((s)=>{
					if(s > rmax && !(s===null)) {
						rmax = s;
					}
				});
				const crow = [];
				row.forEach((s) => {
					if(!(s===null)) {
						crow.push(s);
					}
				}); //copy
				crow.sort();
				const nc = crow.length;
				//row median
				let rmed;
				if (nc % 2 == 0) { //even
					rmed = 0.5*(crow[nc/2-1] + crow[nc/2+1-1]); 
				} else { //odd
					rmed = crow[(nc+1)/2-1]; 
				}
				tmp[x[j]] = [rmin, rmax, rmean, rmed, rstd];
			}
			summary__[z[i]] = tmp;
		}	

		return summary__;
	}


	function corCov(x,y) {
		//Calculate covariance and correlation between two arrays 
		//See e.g https://en.wikipedia.org/wiki/Correlation

		const nx = x.length;
		const ny = y.length;
		if(!(nx===ny)) { 
			throw new Error('x and y lengths need to be equal');
		}
		let xsum = 0.0;
		let ysum = 0.0;
		let xnull = 0;
		let ynull = 0;
		x.forEach((s)=>{
			if(!(s===null)){xsum+=s;}else{xnull++;}
		});
		y.forEach((s)=>{
			if(!(s===null)){ysum+=s;}else{ynull++;}
		});
		const xmean = xsum/(1.0*(nx-xnull-1));
		const ymean = ysum/(1.0*(ny-ynull-1));
		const xstd = 0.0;
		const ystd = 0.0;
		x.forEach((s)=>{
			if(!(s===null)){xstd+=(s-xmean)*(s-xmean);}
		});
		y.forEach((s)=>{
			if(!(s===null)){ystd+=(s-ymean)*(s-ymean);}
		});
		xstd = Math.sqrt(xstd/(1.0*(nx-xnull-1))); //Bessel's correction
		ystd = Math.sqrt(ystd/(1.0*(ny-ynull-1))); //Bessel's correction

		let xycov = 0.0;
		for(var i = 0; i < nx; i++) { xycov += (x[i]-xmean)*(y[i]-ymean); }
		xycov = xycov/(1.0*(nx-xnull-1)); //Bessel's correction
		const xycorr = xycov/(xstd*ystd); 
		
		return {'corr':xycorr, 'cov':xycov, 'std':[xstd,ystd], 'mean':[xmean,ymean]};

	}

	
	module.exports.summaryStats = summaryStats;
	module.exports.summaryStats2 = summaryStats2;
	module.exports.getQuery = getQuery;
	module.exports.postQuery = postQuery;
	module.exports.getMap = getMap;
	module.exports.corCov = corCov;
	module.exports.getArrays = getArrays;
	
	