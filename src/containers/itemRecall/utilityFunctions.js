export function processValidationDataSKU(data,param,includeExpiry){
  let finalArr=[],outerObj={}
  var processedData=[],
  skuList = data.sku_list,
  status = data.status,
  statusList = data.status_list,
  attList = data.attributes_list,
  i18n = data.i18n_values,
  totalValid=0,totalInvalid=0,kq=false,audit_name="";
  const expiryCategory = {
    category_text:"",
    category_value:"expired",
    attributeList:{
      "$expired":{
        text:"Expired",
        checked:false,
        excludeFromSet:true
      }
    }
  }
 if(param=="Edit_Dup")
 {
let attrSet=data.attributes_list_sets;

for(let a=0,len=attrSet.length;a<len;a++){
  let skuobj={}, obj2={};
  let arr=attrSet[a].attributes_sets;
  for(let b=0,len=arr.length;b<len;b++){
    let obj1={};
    Object.keys(arr[b]).map(function(key,index){
      
      for(let c=0,len=arr[b][key].length;c<len;c++){
        let obj={};
        obj.text=arr[b][key][c];
        obj.category=key;
        obj1[arr[b][key][c]]=obj;
        
      }
      obj2[b]=obj1;
  
    })

  }
  outerObj[attrSet[a].sku]=obj2;
}
kq=data.kq;
audit_name=data.audit_param_name||"";

}


  for(let i=0,len = skuList.length; i< len ;i++){
    let tuple ={};
    tuple.skuName = skuList[i];
    if(param=="Edit_Dup")
    {
    totalValid++;
  }else
  {
    tuple.status = status[statusList[i]];
    totalValid = (tuple.status.constructor === Boolean) ? (totalValid+1) : totalValid;
    totalInvalid = (tuple.status.constructor !== Boolean) ? (totalInvalid+1) : totalInvalid;
    }
    let attributeList = attList[i];
    let categoryList = [];
    for(let key in attributeList){
      let attTuple = {}
      attTuple.category_text = i18n[key][0].display_name;
      attTuple.category_value = key;
      let attObj={};
      attributeList[key].forEach(function(el){
        attObj[el] = {};
        attObj[el].text = el;
        attObj[el].checked = false;
      })
      attTuple.attributeList = attObj;
      categoryList.push(attTuple);
    }
    if(includeExpiry && categoryList.length){
      categoryList.unshift(expiryCategory);
    }
    tuple.attributeList = categoryList;
    processedData.push(tuple)
    
  }
 
  return {
   data:processedData,
    totalValid,
    totalInvalid,outerObj,
    kq,
    audit_name,
    totalSKUs:totalValid+totalInvalid
  };
}