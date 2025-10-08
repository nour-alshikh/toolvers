<script setup lang="ts">


defineProps({
    widget: {
        type: String,
        required: false
    },
    screen: {
        type: String,
        required: true
    }
})




function handleInput(input: any) {
    const toolversTool = document.querySelector('.toolvers-tool') 
    const el = toolversTool?.querySelector(`[data-id="${input.id}"]`)
    if(toolversTool instanceof HTMLElement &&  input.type === 'position'){
  handlePosition(input , toolversTool)
}

  if (el instanceof HTMLElement ) {
    if (input.type === 'text') {
      el.textContent = input.value
    }

    if (input.type === 'range' && input.property === 'fontSize') {
        if (Array.isArray(input.value)) {

      el.style.fontSize =  `${input.value[0]}px`
    }
    }
    if (input.type === 'range' && input.property === 'scale') {
        if (Array.isArray(input.value) && toolversTool instanceof HTMLElement) {
              let transformValue = toolversTool.style.transform || ""
              if(transformValue){
                
                transformValue = transformValue.replace(/scale\([^)]+\)/, "").trim()
                toolversTool.style.transform = `${transformValue} scale(${input.value[0]})`
              } else{
                toolversTool.style.transform = `scale(${input.value[0]})`
              }
 
              handlePosition(input , toolversTool)    
  }
    }
    
    if (input.type === 'color' && input.property === 'color') {
      // Apply the color to the element
      if (input.value && input.value.hex) {
        el.style.color = input.value.hex
      } else if (typeof input.value === 'string') {
        // In case the color is stored as a hex string
        el.style.color = input.value
      }
    
    }
    if (input.type === 'color' && input.property === 'backgroundColor') {
      // Apply the color to the element
      if (input.value && input.value.hex) {
        el.style.backgroundColor = input.value.hex
      } else if (typeof input.value === 'string') {
        // In case the color is stored as a hex string
        el.style.backgroundColor = input.value
      }
    }

  }
}

function handlePosition(input: any, toolversTool: HTMLElement){
    let transformValue = toolversTool.style.transform || ""

    
    if(transformValue){
        
        transformValue = transformValue.replace(/translate\([^)]+\)/, "").trim()
        toolversTool.style.transform = `${transformValue} translate(-50%, -50%)`
        
        
        if(input.value === 'top-left' || toolversTool.dataset.position === 'top-left'){
            toolversTool.dataset.position = `top-left`  
            toolversTool.style.top = `calc( 0% + ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(0% + ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        if(input.value === 'top' || toolversTool.dataset.position === 'top'){     
            toolversTool.dataset.position = `top`
            toolversTool.style.top = `calc(0% + ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `50%`
        }
        if(input.value === 'top-right' || toolversTool.dataset.position === 'top-right'){
            toolversTool.dataset.position = `top-right`
            toolversTool.style.top = `calc(0% + ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(100% - ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        
        if(input.value === 'center-left' || toolversTool.dataset.position === 'center-left'){
            toolversTool.dataset.position = `center-left`
    
            toolversTool.style.top = `50%`
            toolversTool.style.left = `calc(0% + ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        
        if(input.value === 'center-right' || toolversTool.dataset.position === 'center-right'){
            toolversTool.dataset.position = `center-right`
            toolversTool.style.top = `50%`
            toolversTool.style.left = `calc(100% - ${toolversTool.getBoundingClientRect().width/2}px)`
        }

        if(input.value === 'bottom-left' || toolversTool.dataset.position === 'bottom-left' ){
            toolversTool.dataset.position = `bottom-left`
            toolversTool.style.top = `calc(100% - ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(0% + ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        if(input.value === 'bottom' || toolversTool.dataset.position === 'bottom') {
            toolversTool.dataset.position = `bottom`
            toolversTool.style.top = `calc(100% - ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `50%`
        }
        if(input.value === 'bottom-right' || toolversTool.dataset.position === 'bottom-right'){
            toolversTool.dataset.position = `bottom-right`
            toolversTool.style.top = `calc(100% - ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(100% - ${toolversTool.getBoundingClientRect().width/2}px)`
        }
    }
    else{
            toolversTool.style.transform = `translate(-50%, -50%)`
        
            if(input.value === 'top-left' || toolversTool.dataset.position === 'top-left'){
            toolversTool.dataset.position = `top-left`  
            toolversTool.style.top = `calc( 0% + ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(0% + ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        if(input.value === 'top' || toolversTool.dataset.position === 'top'){     
            toolversTool.dataset.position = `top`
            toolversTool.style.top = `calc(0% + ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `50%`
        }
        if(input.value === 'top-right' || toolversTool.dataset.position === 'top-right'){
            toolversTool.dataset.position = `top-right`
            toolversTool.style.top = `calc(0% + ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(100% - ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        
        if(input.value === 'center-left' || toolversTool.dataset.position === 'center-left'){
            toolversTool.dataset.position = `center-left`
    
            toolversTool.style.top = `50%`
            toolversTool.style.left = `calc(0% + ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        
        if(input.value === 'center-right' || toolversTool.dataset.position === 'center-right'){
            toolversTool.dataset.position = `center-right`
            toolversTool.style.top = `50%`
            toolversTool.style.left = `calc(100% - ${toolversTool.getBoundingClientRect().width/2}px)`
        }

        if(input.value === 'bottom-left' || toolversTool.dataset.position === 'bottom-left' ){
            toolversTool.dataset.position = `bottom-left`
            toolversTool.style.top = `calc(100% - ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(0% + ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        if(input.value === 'bottom' || toolversTool.dataset.position === 'bottom') {
            toolversTool.dataset.position = `bottom`
            toolversTool.style.top = `calc(100% - ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `50%`
        }
        if(input.value === 'bottom-right' || toolversTool.dataset.position === 'bottom-right'){
            toolversTool.dataset.position = `bottom-right`
            toolversTool.style.top = `calc(100% - ${toolversTool.getBoundingClientRect().height/2}px)`
            toolversTool.style.left = `calc(100% - ${toolversTool.getBoundingClientRect().width/2}px)`
        }
        
        


        }
}

</script>


<template>
   <div class="toolvers-tool">
     <div class="relative" v-html="widget ?? ''" >
       
       
    </div>
  </div>

</template>
