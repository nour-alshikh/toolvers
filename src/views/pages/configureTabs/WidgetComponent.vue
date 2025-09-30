<script setup lang="ts">
import { inject, watch } from 'vue'

const props = defineProps<{
  screen: 'mobile' | 'desktop'
}>()

watch(
  () => props.screen,
  (newVal) => {
    if (newVal === 'mobile') {
        MobileDisplayInputs.value.map((input: any) => {
    input.inputs.map((inner: any) => {
     handleInput(inner)
    })
  })
}
if (newVal === 'desktop') {
    
    DesktopDisplayInputs.value.map((input: any) => {
    input.inputs.map((inner: any) => {
    handleInput(inner)
    })
    })
    }
  }
)


const inputs = inject('inputs') 
const DesktopDisplayInputs = inject('DesktopDisplayInputs')
const MobileDisplayInputs = inject('MobileDisplayInputs')

inputs.value.forEach(group => {
  group.inputs.forEach(inner => {
    watch(
      () => inner,          // watch this single input object
      (newVal, oldVal) => {
        handleInput(newVal)
      },
      { deep: true }
    )
  })
})
DesktopDisplayInputs.value.forEach(group => {
  group.inputs.forEach(inner => {
    watch(
      () => inner,          // watch this single input object
      (newVal, oldVal) => {
        handleInput(newVal)
      },
      { deep: true }
    )
  })
})
MobileDisplayInputs.value.forEach(group => {
  group.inputs.forEach(inner => {
    watch(
      () => inner,          // watch this single input object
      (newVal, oldVal) => {
        handleInput(newVal)
      },
      { deep: true }
    )
  })
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

              console.log("1");
              
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
    <div class="relative w-full h-full">
        
    <div class="toolvers-tool absolute origin-top-left">
        <div class="coupon-dialog-one toolvers-widget" data-id="dialog" id="coupon-dialog">
            <button class="coupon-close close-banner"  data-id="close" >x</button>

            <div class="coupon-icon-wrapper" data-id="icon-wrapper">
                <img  style="width: 80px; height: 80px;object-fit: contain;" class="icon"
                    data-id="icon"></img>
            </div>

            <div class="coupon-content">
                <h3 class="coupon-title" data-id="title">!خصم 35%</h3>
                <p class="coupon-subtitle" data-id="subtitle">قسيمة تخفيضات سارية لمدة ٤٨ ساعة !</p>

                <div class="coupon-code-container">
                    <span class="coupon-code" data-id="code">COUPON20</span>
                </div>

                <div class="coupon-actions">
                    <button class="coupon-button" data-id="get-coupon">احصل على
                        الكوبون</button>
                    <a class="coupon-skip close-banner " data-id="skip" >لاحقا!</a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
.coupon-dialog-one {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 620px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    position: relative;
    direction: rtl;
    gap: 24px;
    margin: 0 auto;
    box-sizing: border-box;
}

   @media (max-width: 600px) {
    .coupon-dialog-one {
        max-width: 435px;
    }
}

@media (max-width: 350px) {
    .coupon-dialog-one {
        max-width: 320px;
    }
}

.mobile-preview-container .coupon-dialog-one {
    max-width: 435px;
}

.coupon-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 17px;
    color: #666;
    padding: 4px;
    line-height: 1;
    font-weight: bold;
}

.coupon-icon-wrapper {
    flex-shrink: 0;
}

.coupon-icon {
    width: 80px;
    height: 80px;
}

.coupon-icon path {
    fill: #4a90e2;
}

.coupon-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.coupon-title {
    font-size: 24px;
    font-weight: bold;
    color: #000;
    margin: 0;
}

.coupon-subtitle {
    font-size: 16px;
    color: #333;
    margin: 0;
}

.coupon-code-container {
    border: 2px dashed #ccc;
    padding: 8px 16px;
    border-radius: 8px;
    margin: auto;
    text-align: center;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
}

.coupon-code {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    letter-spacing: 1px;
}

.coupon-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.coupon-button {
    background-color: #000;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    position: relative;
    width: 100%;
}

.coupon-button:hover {
    background-color: #333;
    transform: translateY(-2px);
}

.coupon-skip {
    color: var(--bs-primary, #ff006c);
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
}

.coupon-skip:hover {
    text-decoration: underline;
}

/* Tooltip styles */
.coupon-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
    margin-bottom: 8px;
}

.coupon-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

.coupon-tooltip.show {
    opacity: 1;
    visibility: visible;
}

/* Mobile responsive styles */
@media screen and (max-width: 600px) {
    .coupon-dialog-one {
    
        padding: 16px;
        gap: 16px;
        width: 435px;
    }

    .coupon-icon-wrapper {
        display: flex;
        justify-content: center;
    }

    .coupon-title {
        font-size: 20px;
        text-align: center;
    }

    .coupon-subtitle {
        font-size: 14px;
        text-align: center;
    }

    .coupon-code {
        font-size: 18px;
    }

    .coupon-button {
        padding: 8px 20px;
        font-size: 15px;
    }

    .coupon-skip {
        font-size: 13px;
    }
}

/* Very small screens */
@media screen and (max-width: 350px) {
    .coupon-dialog-one {
        gap: 12px;
        width: 320px;
    }

    .coupon-icon-wrapper img {
        width: 60px;
        height: 60px;
    }

    .coupon-title {
        font-size: 18px;
    }

    .coupon-subtitle {
        font-size: 13px;
    }

    .coupon-code {
        font-size: 16px;
    }
}
</style>