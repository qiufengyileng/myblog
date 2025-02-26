
const event = new CustomEvent('changeTheme')
export default function addCodeControl (element) {
  const codeControl = document.createElement('div')
  element.style = 'position: relative;'
  
  codeControl.style = `
    position: absolute;
    top: 0;
    right: 0;
    margin: 4px 4px;
    gap: 4px;
    display: flex;
  `

  // 创建按钮并添加事件监听
  const themeBtn = document.createElement('button')
  themeBtn.className = 'code-control-button'
  themeBtn.textContent = '切换主题'
  themeBtn.style = `
  border: 1px solid #a0a29db8;
    border-radius: 4px;`
  themeBtn.onclick = () => {
    // 切换主题逻辑
    // console.log('切换主题')
    document.dispatchEvent(event)
  }

  const copyBtn = document.createElement('button')
  copyBtn.style = `
  border: 1px solid #a0a29db8;
    border-radius: 4px;`
  copyBtn.className = 'code-control-button'
  copyBtn.textContent = '复制'
  copyBtn.onclick = async () => {
    try {
      // 获取代码块里面的内容
      const code = element.querySelector('code')?.textContent || ''
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code)
      } else {
        const code = element.querySelector('code')?.textContent || ''
        // 创建一个临时文本区域
        const textArea = document.createElement('textarea')
        textArea.value = code
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy') // 使用 execCommand 进行复制，兼容性更好
        document.body.removeChild(textArea) // 移除临时文本区域
        // 可以添加复制成功的提示
      }
      // 可以添加复制成功的提示
      copyBtn.textContent = '已复制'
      setTimeout(() => {
        copyBtn.textContent = '复制'
      }, 1500)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  codeControl.appendChild(themeBtn)
  codeControl.appendChild(copyBtn)
  element.prepend(codeControl)
}
