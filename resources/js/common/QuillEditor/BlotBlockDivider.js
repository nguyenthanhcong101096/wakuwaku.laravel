export default function BlotBlockDivider (Block) {
  class BlotBlockDivider extends Block {
    static blotName = 'wk-divider';
    static tagName = 'hr';
  }
  return BlotBlockDivider
}
