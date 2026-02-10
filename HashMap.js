class Hashmap{
    constructor(size = 16){
        this.buckets = new Array(size);
        this.size = size;
        this.numOfKeys = 0;
    }

    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i < key.length; i++){
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
            
        }
        return hashCode;
    };

    // place remainging buckets inside updated array;
    resize(){
        const newTable = new Array(this.buckets.length * 2);
        
        
        this.buckets.forEach(bucket => {
            if(bucket){
                bucket.forEach(([key, value]) => {
                    let hashCode = 0;
                    const primeNumber = 31;
                    for(let i = 0; i < key.length; i++){
                        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
            
                    }
                    let index = hashCode;
                    if(newTable[index]){
                        newTable[index].push([key, value]);
                    } else {
                        newTable[index] = [[key, value]];
                    }
                });
            };
        })
       
       
        
        this.buckets = newTable;
        
        this.size = this.buckets.length;
       
    }

    set(key, value){
        
        const loadFactor = this.numOfKeys / this.buckets.length;
        //console.log(loadFactor);
        if(loadFactor > 0.75){
            this.resize();
        }

        const index = this.hash(key);

        
        if(!this.buckets[index]){
            this.buckets[index] = [[key, value]];
            
        } else {
            const sameKeyItem = this.buckets[index].find(item => item[0] === key);
            if(sameKeyItem){
                sameKeyItem[1] = value;
                return this.numOfKeys
            } else {
                this.buckets[index].push([key, value]);
            }
        }
        this.numOfKeys++;
        //console.log(loadFactor);
        //console.log(index);
        
        
    };
    // get function works!
    get(key){
        let index = this.hash(key);
        
        if(!this.buckets[index]){
            return null;
        }

        for(let bucket of this.buckets[index]){
            if(bucket[0] === key){
                return bucket[1];
            }
        }
    };

    //has function works
    has(key){
        let index = this.hash(key);
        while(this.buckets){
            if(this.buckets[index]){
                return true;
            } else {
                return false;
            }
        }
    };

    // remove function works!
    remove(key){
        let index = this.hash(key);
        
        if(this.buckets[index]){
            // i chose delete because it doesn't effect the length if the array compared to using splice.
                
            let idx = this.buckets[index];
            //console.log(idx);    
            if(idx.length > 1){
                
                for(let i = 0; i < idx.length; i++){
                   
                    //console.log(idx[i]);
                    //looks for key in index 0 of value pair array and compares entry 
                    if(idx[i][0] === key){
                        //console.log(idx[i][0]);
                        // deletes the array at idx of array which contains [key, value] pair;
                        delete idx[i];
                    }
                }
                   
            } else {
                delete this.buckets[index];
            }    
                
                
            
            this.numOfKeys--;
            return true;
        } else {
            return false;
        }
        
    };
    //length function works
    length(){
        

        return this.numOfKeys;
        
    };

    // clear function works.
    clear(){
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                //console.log(this.buckets[i]);
                if(this.buckets[i].length > 1){
                    //console.log(this.buckets[i])
                    let buckets = this.buckets[i];
                    //deletes the extra arrays of key value pairs
                    for(let j = 0; j < buckets.length; j++){
                        
                        delete buckets[j];
                    }
                    // remove two chained keys in array
                    this.numOfKeys--;
                }
                // decrements count of remaining keys in array
                this.numOfKeys--;
                
            }
            delete this.buckets[i];
           
        }
        
    };

    // keys value works.
    keys(){
        let keysArray = [];
        
        
        for(let i = 0; i < this.buckets.length; i++){
          
            if(this.buckets[i]){
                if(this.buckets[i].length > 1){
                    
                    this.buckets[i].find(bucket => {
                        
                        keysArray.push(bucket[0]);
                        
                        
                    })
                }

                if(this.buckets[i].length === 1){
                    
                    this.buckets[i].find(bucket => {
                       
                        keysArray.push(bucket[0]);
                    })
                    
                }
            }
        }
        
        return keysArray; 
    };

   // value function work!
    values(){
        let valueArr = [];

        for(let i = 0; i < this.buckets.length; i++){
            
            if(this.buckets[i]){
                //console.log(this.buckets[i]);
                
                if(this.buckets[i].length > 1){
                    
                    this.buckets[i].find(bucket => {
                        //console.log(bucket);
                       
                       if(bucket){
                        //console.log(bucket[1]);
                        valueArr.push(bucket[1]);
                       }
                        
                        
                        
                    })
                   
                  
                    
                }
                if(this.buckets[i].length === 1){
                    
                    this.buckets[i].find(bucket => {
                        if(bucket){
                        //console.log(bucket[1]);
                        valueArr.push(bucket[1]);
                       }
                        
                    });
                    
                }
                
                
               
            }
            
        }
        
        
        return valueArr;
    }
    // entries function works now !
    entries(){
        let keyValue = [];

        for(let i = 0; i < this.buckets.length; i++){
            let array = [];
            if(this.buckets[i]){
                array.push(this.buckets[i]);
                //console.log(array);

                let newArray = [];

                for(let j = 0; j < array.length; j++){
                    // if array contains more than one key pair array push to final array
                    if(array[j].length > 1){
                        console.log(array[j]);
                        array[j].forEach(index => {
                            keyValue.push(index);
                        })
                    } else {
                        newArray.push(array[j][0]);
                        console.log(newArray);
                        // pushes to array containing all key value pairs 
                        newArray.forEach(index => {
                                keyValue.push(index);
                    
                        });
                    }
                    

                  
                   
                   

                    
                }
            }
        }
        return keyValue;
    }
}








export const Hash = new Hashmap();
/*console.log(Hash);
Hash.set('John', 'This is my first value');
Hash.set('Gabe', 'This is my second value');
Hash.set('Jobe', 'This is my first value');
Hash.set('Josh', 'This is my fourth value');

console.log(Hash);
console.log(Hash.get('doodoo'));
console.log(Hash.has('Jo'));
console.log(Hash.has('Jobe'));
console.log(Hash.remove('Gabe'));
Hash.clear();
console.log(Hash);
console.log(Hash.keys());
console.log(Hash.length());
console.log(Hash.entries());
console.log(Hash.values());*/
