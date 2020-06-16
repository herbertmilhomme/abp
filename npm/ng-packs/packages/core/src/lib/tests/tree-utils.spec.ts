import { createTreeFromList, TreeNode } from '../utils/tree-utils';

const LIST_1 = [
  { id: 1, pid: null },
  { id: 2, pid: 1 },
];
const LIST_2 = [
  { id: 1, pid: null },
  { id: 2, pid: 1 },
  { id: 3, pid: 1 },
];
const LIST_3 = [
  { id: 1, pid: null },
  { id: 2, pid: 1 },
  { id: 3, pid: 2 },
];
const TREE_1 = [
  { id: 1, pid: null, isLeaf: false, children: [{ id: 2, pid: 1, isLeaf: true, children: [] }] },
];
const TREE_2 = [
  {
    id: 1,
    pid: null,
    isLeaf: false,
    children: [
      { id: 2, pid: 1, isLeaf: true, children: [] },
      { id: 3, pid: 1, isLeaf: true, children: [] },
    ],
  },
];
const TREE_3 = [
  {
    id: 1,
    pid: null,
    isLeaf: false,
    children: [
      { id: 2, pid: 1, isLeaf: false, children: [{ id: 3, pid: 2, isLeaf: true, children: [] }] },
    ],
  },
];
describe('Tree Utils', () => {
  describe('createTreeFromList', () => {
    test.each`
      list      | expected
      ${LIST_1} | ${TREE_1}
      ${LIST_2} | ${TREE_2}
      ${LIST_3} | ${TREE_3}
    `('should return $expected when given $list', ({ list, expected }: TestCreateTreeFromList) => {
      expect(
        createTreeFromList(
          list,
          x => x.id,
          x => x.pid,
        ),
      ).toEqual(expected);
    });
  });
});

interface TestCreateTreeFromList {
  list: ModelA[];
  expected: TreeNode<ModelA>[];
}

interface ModelA {
  id: 1;
  pid: null;
}
