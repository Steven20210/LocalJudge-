export interface TestCase {
  input: string;
  expected: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: Example[];
  constraints: string[];
  testCases: TestCase[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
}

export const problems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
      { input: "[1,2,3,4,5], 8", expected: "[2,4]" },
      { input: "[0,4,3,0], 0", expected: "[0,3]" },
      { input: "[-1,-2,-3,-4,-5], -8", expected: "[2,4]" },
      { input: "[1,5,8,10,13,17], 18", expected: "[2,5]" },
      { input: "[2,4,6,8,10], 12", expected: "[1,4]" },
      { input: "[1,1,1,1,1], 2", expected: "[0,1]" },
      { input: "[100,200,300,400], 500", expected: "[1,3]" },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Write your solution here
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    testCases: [
      { input: "[2,4,3], [5,6,4]", expected: "[7,0,8]" },
      { input: "[0], [0]", expected: "[0]" },
      { input: "[9,9,9,9,9,9,9], [9,9,9,9]", expected: "[8,9,9,9,0,0,0,1]" },
      { input: "[1,2,3], [4,5,6]", expected: "[5,7,9]" },
      { input: "[1], [9,9]", expected: "[0,0,1]" },
      { input: "[5], [5]", expected: "[0,1]" },
      { input: "[1,2], [3,4,5]", expected: "[4,6,5]" },
      { input: "[9,8], [1]", expected: "[0,9]" },
      { input: "[1,1,1], [9,9,9]", expected: "[0,1,1,1]" },
      { input: "[2,4,6], [1,3,5]", expected: "[3,7,1,1]" },
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Write your solution here
    
}`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    """
    :type l1: ListNode
    :type l2: ListNode
    :rtype: ListNode
    """
    # Write your solution here
    
`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your solution here
        
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: "The answer is 'abc', with the length of 3.",
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: "The answer is 'b', with the length of 1.",
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: "The answer is 'wke', with the length of 3.",
      },
    ],
    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    testCases: [
      { input: '"abcabcbb"', expected: "3" },
      { input: '"bbbbb"', expected: "1" },
      { input: '"pwwkew"', expected: "3" },
      { input: '""', expected: "0" },
      { input: '"a"', expected: "1" },
      { input: '"ab"', expected: "2" },
      { input: '"abc"', expected: "3" },
      { input: '"aaaa"', expected: "1" },
      { input: '"abcd"', expected: "4" },
      { input: '"abcabcabc"', expected: "3" },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Write your solution here
    
}`,
      python: `def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation:
          "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: [
      "nums1.length + nums2.length == m + n",
      "0 ≤ m, n ≤ 1000",
      "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶",
    ],
    testCases: [
      { input: "[1,3], [2]", expected: "2.0" },
      { input: "[1,2], [3,4]", expected: "2.5" },
      { input: "[1], [2]", expected: "1.5" },
      { input: "[1,2], []", expected: "1.5" },
      { input: "[], [1,2]", expected: "1.5" },
      { input: "[1,2,3], [4,5,6]", expected: "3.5" },
      { input: "[1,3,5], [2,4,6]", expected: "3.5" },
      { input: "[1], []", expected: "1.0" },
      { input: "[], [1]", expected: "1.0" },
      { input: "[1,2,3,4], [5,6,7,8]", expected: "4.5" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // Write your solution here
    
}`,
      python: `def findMedianSortedArrays(nums1, nums2):
    """
    :type nums1: List[int]
    :type nums2: List[int]
    :rtype: float
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "5",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'",
    ],
    testCases: [
      { input: '"()"', expected: "true" },
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" },
      { input: '"([)]"', expected: "false" },
      { input: '"{[]}"', expected: "true" },
      { input: '"("', expected: "false" },
      { input: '")"', expected: "false" },
      { input: '""', expected: "true" },
      { input: '"((("', expected: "false" },
      { input: '"))"', expected: "false" },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your solution here
    
}`,
      python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "6",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50]",
      "-100 ≤ Node.val ≤ 100",
      "Both list1 and list2 are sorted in non-decreasing order",
    ],
    testCases: [
      { input: "[1,2,4], [1,3,4]", expected: "[1,1,2,3,4,4]" },
      { input: "[], []", expected: "[]" },
      { input: "[], [0]", expected: "[0]" },
      { input: "[1,2,3], [4,5,6]", expected: "[1,2,3,4,5,6]" },
      { input: "[1], [2]", expected: "[1,2]" },
      { input: "[1,3,5], [2,4,6]", expected: "[1,2,3,4,5,6]" },
      { input: "[1,2,3], []", expected: "[1,2,3]" },
      { input: "[], [1,2,3]", expected: "[1,2,3]" },
      { input: "[1,1,1], [1,1,1]", expected: "[1,1,1,1,1,1]" },
      { input: "[1,2], [3,4,5,6]", expected: "[1,2,3,4,5,6]" },
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Write your solution here
    
}`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1, list2):
    """
    :type list1: ListNode
    :type list2: ListNode
    :rtype: ListNode
    """
    # Write your solution here
    
`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "7",
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { input: "[1]", expected: "1" },
      { input: "[5,4,-1,7,8]", expected: "23" },
      { input: "[-1]", expected: "-1" },
      { input: "[-2,-1]", expected: "-1" },
      { input: "[1,2,3,4,5]", expected: "15" },
      { input: "[-1,-2,-3,-4]", expected: "-1" },
      { input: "[2,-1,3,-2,4]", expected: "6" },
      { input: "[0,0,0,0]", expected: "0" },
      { input: "[1,-1,1,-1,1]", expected: "1" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Write your solution here
    
}`,
      python: `def maxSubArray(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "8",
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation:
          "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps",
      },
      {
        input: "n = 3",
        output: "3",
        explanation:
          "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step",
      },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    testCases: [
      { input: "2", expected: "2" },
      { input: "3", expected: "3" },
      { input: "4", expected: "5" },
      { input: "5", expected: "8" },
      { input: "1", expected: "1" },
      { input: "6", expected: "13" },
      { input: "7", expected: "21" },
      { input: "8", expected: "34" },
      { input: "9", expected: "55" },
      { input: "10", expected: "89" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    // Write your solution here
    
}`,
      python: `def climbStairs(n):
    """
    :type n: int
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "9",
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Inorder traversal visits nodes in the order: left subtree, root, right subtree.`,
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
      },
      {
        input: "root = []",
        output: "[]",
      },
      {
        input: "root = [1]",
        output: "[1]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100]",
      "-100 ≤ Node.val ≤ 100",
    ],
    testCases: [
      { input: "[1,null,2,3]", expected: "[1,3,2]" },
      { input: "[]", expected: "[]" },
      { input: "[1]", expected: "[1]" },
      { input: "[1,2,3,4,5]", expected: "[4,2,5,1,3]" },
      { input: "[1,2,3]", expected: "[2,1,3]" },
      { input: "[1,null,2]", expected: "[1,2]" },
      { input: "[1,2,null]", expected: "[2,1]" },
      { input: "[1,2,3,4,null,5,6]", expected: "[4,2,1,5,3,6]" },
      { input: "[1,2,3,4,5,6,7]", expected: "[4,2,5,1,6,3,7]" },
      { input: "[1,null,2,null,3]", expected: "[1,2,3]" },
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function inorderTraversal(root) {
    // Write your solution here
    
}`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorderTraversal(root):
    """
    :type root: TreeNode
    :rtype: List[int]
    """
    # Write your solution here
    
`,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        // Write your solution here
        
    }
}`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "10",
    title: "Reverse Integer",
    difficulty: "Medium",
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
    examples: [
      {
        input: "x = 123",
        output: "321",
      },
      {
        input: "x = -123",
        output: "-321",
      },
      {
        input: "x = 120",
        output: "21",
      },
    ],
    constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
    testCases: [
      { input: "123", expected: "321" },
      { input: "-123", expected: "-321" },
      { input: "120", expected: "21" },
      { input: "0", expected: "0" },
      { input: "1534236469", expected: "0" },
      { input: "-2147483648", expected: "0" },
      { input: "1", expected: "1" },
      { input: "-1", expected: "-1" },
      { input: "10", expected: "1" },
      { input: "-10", expected: "-1" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
    // Write your solution here
    
}`,
      python: `def reverse(x):
    """
    :type x: int
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int reverse(int x) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int reverse(int x) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "11",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
      },
    ],
    constraints: [
      "n == height.length",
      "1 ≤ n ≤ 2 * 10⁴",
      "0 ≤ height[i] ≤ 10⁵",
    ],
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { input: "[4,2,0,3,2,5]", expected: "9" },
      { input: "[1,0,1]", expected: "1" },
      { input: "[1,0,0,1]", expected: "2" },
      { input: "[0,1,0]", expected: "0" },
      { input: "[1,1,1]", expected: "0" },
      { input: "[3,0,0,2,0,4]", expected: "10" },
      { input: "[0,2,0]", expected: "0" },
      { input: "[2,0,2]", expected: "2" },
      { input: "[5,4,1,2]", expected: "1" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    // Write your solution here
    
}`,
      python: `def trap(height):
    """
    :type height: List[int]
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int trap(int[] height) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "12",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.`,
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation:
          "The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.",
      },
      {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
        explanation: "We merge [1] and []. The result is [1].",
      },
      {
        input: "nums1 = [0], m = 0, nums2 = [1], n = 1",
        output: "[1]",
        explanation:
          "We merge [] and [1]. The result is [1]. Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.",
      },
    ],
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 ≤ m, n ≤ 200",
      "1 ≤ m + n ≤ 200",
      "-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹",
    ],
    testCases: [
      { input: "[1,2,3,0,0,0], 3, [2,5,6], 3", expected: "[1,2,2,3,5,6]" },
      { input: "[1], 1, [], 0", expected: "[1]" },
      { input: "[0], 0, [1], 1", expected: "[1]" },
      { input: "[1,2,3], 3, [4,5,6], 3", expected: "[1,2,3,4,5,6]" },
      { input: "[4,5,6], 3, [1,2,3], 3", expected: "[1,2,3,4,5,6]" },
      { input: "[1,3,5], 3, [2,4,6], 3", expected: "[1,2,3,4,5,6]" },
      { input: "[1], 1, [2], 1", expected: "[1,2]" },
      { input: "[2], 1, [1], 1", expected: "[1,2]" },
      { input: "[1,2], 2, [3,4], 2", expected: "[1,2,3,4]" },
      { input: "[3,4], 2, [1,2], 2", expected: "[1,2,3,4]" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
    // Write your solution here
    
}`,
      python: `def merge(nums1, m, nums2, n):
    """
    :type nums1: List[int]
    :type m: int
    :type nums2: List[int]
    :type n: int
    :rtype: None Do not return anything, modify nums1 in-place instead.
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "13",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: `Given a string s, return the longest palindromic substring in s.`,
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 1000",
      "s consist of only digits and English letters.",
    ],
    testCases: [
      { input: '"babad"', expected: '"bab"' },
      { input: '"cbbd"', expected: '"bb"' },
      { input: '"a"', expected: '"a"' },
      { input: '"aa"', expected: '"aa"' },
      { input: '"aaa"', expected: '"aaa"' },
      { input: '"abc"', expected: '"a"' },
      { input: '"racecar"', expected: '"racecar"' },
      { input: '"abba"', expected: '"abba"' },
      { input: '"aba"', expected: '"aba"' },
      { input: '"abcd"', expected: '"a"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    // Write your solution here
    
}`,
      python: `def longestPalindrome(s):
    """
    :type s: str
    :rtype: str
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "14",
    title: "Group Anagrams",
    difficulty: "Medium",
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
      },
    ],
    constraints: [
      "1 ≤ strs.length ≤ 10⁴",
      "0 ≤ strs[i].length ≤ 100",
      "strs[i] consists of lowercase English letters.",
    ],
    testCases: [
      {
        input: '["eat","tea","tan","ate","nat","bat"]',
        expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      { input: '[""]', expected: '[[""]]' },
      { input: '["a"]', expected: '[["a"]]' },
      { input: '["abc","cba","bac"]', expected: '[["abc","cba","bac"]]' },
      { input: '["a","b","c"]', expected: '[["a"],["b"],["c"]]' },
      { input: '["aa","aa"]', expected: '[["aa","aa"]]' },
      { input: '["abc","def","ghi"]', expected: '[["abc"],["def"],["ghi"]]' },
      {
        input: '["listen","silent","enlist"]',
        expected: '[["listen","silent","enlist"]]',
      },
      { input: '["",""]', expected: '[["",""]]' },
      { input: '["a","","b"]', expected: '[["a"],[""],["b"]]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    // Write your solution here
    
}`,
      python: `def groupAnagrams(strs):
    """
    :type strs: List[str]
    :rtype: List[List[str]]
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "15",
    title: "Container With Most Water",
    difficulty: "Medium",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines, which, together with the x-axis forms a container, such that the container contains the maximum amount of water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The maximum area is obtained by choosing height[1] = 8 and height[8] = 7, giving us 8 * (8-1) = 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
      { input: "[1,1]", expected: "1" },
      { input: "[1,2,1]", expected: "2" },
      { input: "[4,3,2,1,4]", expected: "16" },
      { input: "[1,2,4,3]", expected: "4" },
      { input: "[1,2,3,4,5]", expected: "6" },
      { input: "[5,4,3,2,1]", expected: "6" },
      { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
      { input: "[2,3,4,5,18,17,6]", expected: "17" },
      { input: "[1,2,3,4,5,6,7,8,9,10]", expected: "25" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    // Write your solution here
    
}`,
      python: `def maxArea(height):
    """
    :type height: List[int]
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int maxArea(int[] height) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "16",
    title: "3Sum",
    difficulty: "Medium",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation:
          "Notice that the order of the output and the order of the triplets does not matter.",
      },
      {
        input: "nums = []",
        output: "[]",
      },
      {
        input: "nums = [0]",
        output: "[]",
      },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[]", expected: "[]" },
      { input: "[0]", expected: "[]" },
      { input: "[0,0,0]", expected: "[[0,0,0]]" },
      { input: "[1,2,-2,-1]", expected: "[]" },
      { input: "[-2,0,1,1,2]", expected: "[[-2,0,2],[-2,1,1]]" },
      { input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[3,0,-2,-1,1,2]", expected: "[[-2,-1,3],[-2,0,2],[-1,0,1]]" },
      { input: "[1,1,-2]", expected: "[]" },
      { input: "[0,0,0,0]", expected: "[[0,0,0]]" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
    // Write your solution here
    
}`,
      python: `def threeSum(nums):
    """
    :type nums: List[int]
    :rtype: List[List[int]]
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "17",
    title: "Merge Intervals",
    difficulty: "Medium",
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation:
          "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ starti ≤ endi ≤ 10⁴",
    ],
    testCases: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        expected: "[[1,6],[8,10],[15,18]]",
      },
      { input: "[[1,4],[4,5]]", expected: "[[1,5]]" },
      { input: "[[1,4],[2,3]]", expected: "[[1,4]]" },
      { input: "[[1,4],[0,4]]", expected: "[[0,4]]" },
      { input: "[[1,4],[0,0]]", expected: "[[0,0],[1,4]]" },
      { input: "[[1,4]]", expected: "[[1,4]]" },
      { input: "[[1,4],[2,5],[7,8]]", expected: "[[1,5],[7,8]]" },
      { input: "[[1,2],[3,4],[5,6]]", expected: "[[1,2],[3,4],[5,6]]" },
      { input: "[[1,5],[2,3],[4,6]]", expected: "[[1,6]]" },
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        expected: "[[1,6],[8,10],[15,18]]",
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    // Write your solution here
    
}`,
      python: `def merge(intervals):
    """
    :type intervals: List[List[int]]
    :rtype: List[List[int]]
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "18",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".`,
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"',
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "There is no common prefix among the input strings.",
      },
    ],
    constraints: [
      "1 ≤ strs.length ≤ 200",
      "0 ≤ strs[i].length ≤ 200",
      "strs[i] consists of only lowercase English letters.",
    ],
    testCases: [
      { input: '["flower","flow","flight"]', expected: '"fl"' },
      { input: '["dog","racecar","car"]', expected: '""' },
      {
        input: '["interspecies","interstellar","interstate"]',
        expected: '"inters"',
      },
      { input: '["throne","throne"]', expected: '"throne"' },
      { input: '["throne","dungeon"]', expected: '""' },
      { input: '["throne","throne","throne"]', expected: '"throne"' },
      { input: '["a"]', expected: '"a"' },
      { input: '[""]', expected: '""' },
      { input: '["",""]', expected: '""' },
      { input: '["a","b"]', expected: '""' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    // Write your solution here
    
}`,
      python: `def longestCommonPrefix(strs):
    """
    :type strs: List[str]
    :rtype: str
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "19",
    title: "Jump Game",
    difficulty: "Medium",
    description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.`,
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation:
          "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation:
          "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "0 ≤ nums[i] ≤ 10⁵"],
    testCases: [
      { input: "[2,3,1,1,4]", expected: "true" },
      { input: "[3,2,1,0,4]", expected: "false" },
      { input: "[0]", expected: "true" },
      { input: "[1,0]", expected: "true" },
      { input: "[0,1]", expected: "false" },
      { input: "[2,0]", expected: "true" },
      { input: "[1,2,3]", expected: "true" },
      { input: "[3,0,0,0]", expected: "true" },
      { input: "[2,5,0,0]", expected: "true" },
      { input: "[1,1,1,1]", expected: "true" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
    // Write your solution here
    
}`,
      python: `def canJump(nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "20",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    description: `Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.`,
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
      },
      {
        input: 'digits = ""',
        output: "[]",
      },
      {
        input: 'digits = "2"',
        output: '["a","b","c"]',
      },
    ],
    constraints: [
      "0 ≤ digits.length ≤ 4",
      "digits[i] is a digit in the range ['2', '9'].",
    ],
    testCases: [
      {
        input: '"23"',
        expected: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
      },
      { input: '""', expected: "[]" },
      { input: '"2"', expected: '["a","b","c"]' },
      { input: '"9"', expected: '["w","x","y","z"]' },
      {
        input: '"22"',
        expected: '["aa","ab","ac","ba","bb","bc","ca","cb","cc"]',
      },
      {
        input: '"234"',
        expected:
          '["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]',
      },
      { input: '"7"', expected: '["p","q","r","s"]' },
      { input: '"8"', expected: '["t","u","v"]' },
      { input: '"6"', expected: '["m","n","o"]' },
      { input: '"5"', expected: '["j","k","l"]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
    // Write your solution here
    
}`,
      python: `def letterCombinations(digits):
    """
    :type digits: str
    :rtype: List[str]
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public List<String> letterCombinations(String digits) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "21",
    title: "Roman to Integer",
    difficulty: "Easy",
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.`,
    examples: [
      {
        input: 's = "III"',
        output: "3",
        explanation: "III = 3.",
      },
      {
        input: 's = "LVIII"',
        output: "58",
        explanation: "L = 50, V = 5, III = 3.",
      },
      {
        input: 's = "MCMXCIV"',
        output: "1994",
        explanation: "M = 1000, CM = 900, XC = 90 and IV = 4.",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
      "It is guaranteed that s is a valid roman numeral in the range [1, 3999].",
    ],
    testCases: [
      { input: '"III"', expected: "3" },
      { input: '"LVIII"', expected: "58" },
      { input: '"MCMXCIV"', expected: "1994" },
      { input: '"I"', expected: "1" },
      { input: '"V"', expected: "5" },
      { input: '"X"', expected: "10" },
      { input: '"L"', expected: "50" },
      { input: '"C"', expected: "100" },
      { input: '"D"', expected: "500" },
      { input: '"M"', expected: "1000" },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
    // Write your solution here
    
}`,
      python: `def romanToInt(s):
    """
    :type s: str
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int romanToInt(String s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int romanToInt(string s) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "22",
    title: "Palindrome Number",
    difficulty: "Easy",
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation:
          "121 reads as 121 from left to right and from right to left.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation:
          "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
      },
      {
        input: "x = 10",
        output: "false",
        explanation:
          "Reads 01 from right to left. Therefore it is not a palindrome.",
      },
    ],
    constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
    testCases: [
      { input: "121", expected: "true" },
      { input: "-121", expected: "false" },
      { input: "10", expected: "false" },
      { input: "0", expected: "true" },
      { input: "12321", expected: "true" },
      { input: "12345", expected: "false" },
      { input: "1", expected: "true" },
      { input: "11", expected: "true" },
      { input: "12", expected: "false" },
      { input: "123", expected: "false" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Write your solution here
    
}`,
      python: `def isPalindrome(x):
    """
    :type x: int
    :rtype: bool
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "23",
    title: "Spiral Matrix",
    difficulty: "Medium",
    description: `Given an m x n matrix, return all elements of the matrix in spiral order.`,
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[1,2,3,6,9,8,7,4,5]",
      },
      {
        input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 ≤ m, n ≤ 10",
      "-100 ≤ matrix[i][j] ≤ 100",
    ],
    testCases: [
      { input: "[[1,2,3],[4,5,6],[7,8,9]]", expected: "[1,2,3,6,9,8,7,4,5]" },
      {
        input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        expected: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
      { input: "[[1]]", expected: "[1]" },
      { input: "[[1,2],[3,4]]", expected: "[1,2,4,3]" },
      { input: "[[1,2,3],[4,5,6]]", expected: "[1,2,3,6,5,4]" },
      { input: "[[1],[2],[3]]", expected: "[1,2,3]" },
      { input: "[[1,2,3]]", expected: "[1,2,3]" },
      { input: "[[1,2],[3,4],[5,6]]", expected: "[1,2,4,6,5,3]" },
      { input: "[[1,2,3,4],[5,6,7,8]]", expected: "[1,2,3,4,8,7,6,5]" },
      {
        input: "[[1,2,3],[4,5,6],[7,8,9],[10,11,12]]",
        expected: "[1,2,3,6,9,12,11,10,7,4,5,8]",
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
    // Write your solution here
    
}`,
      python: `def spiralOrder(matrix):
    """
    :type matrix: List[List[int]]
    :rtype: List[int]
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "24",
    title: "Generate Parentheses",
    difficulty: "Medium",
    description: `Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.`,
    examples: [
      {
        input: "n = 3",
        output: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      {
        input: "n = 1",
        output: '["()"]',
      },
    ],
    constraints: ["1 ≤ n ≤ 8"],
    testCases: [
      {
        input: "3",
        expected: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      { input: "1", expected: '["()"]' },
      { input: "2", expected: '["(())","()()"]' },
      {
        input: "4",
        expected:
          '["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]',
      },
      { input: "0", expected: '[""]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    // Write your solution here
    
}`,
      python: `def generateParenthesis(n):
    """
    :type n: int
    :rtype: List[str]
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public List<String> generateParenthesis(int n) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "25",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation:
          "merging the above 3 lists: [1,4,5] + [1,3,4] + [2,6] = [1,1,2,3,4,4,5,6]",
      },
      {
        input: "lists = []",
        output: "[]",
      },
      {
        input: "lists = [[]]",
        output: "[]",
      },
    ],
    constraints: [
      "k == lists.length",
      "0 ≤ k ≤ 10⁴",
      "0 ≤ lists[i].length ≤ 500",
      "-10⁴ ≤ lists[i][j] ≤ 10⁴",
      "lists[i] is sorted in ascending order.",
      "The sum of lists[i].length will not exceed 10⁴.",
    ],
    testCases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" },
      { input: "[]", expected: "[]" },
      { input: "[[]]", expected: "[]" },
      { input: "[[1],[2],[3]]", expected: "[1,2,3]" },
      { input: "[[1,2,3],[4,5,6],[7,8,9]]", expected: "[1,2,3,4,5,6,7,8,9]" },
      { input: "[[1],[1],[1]]", expected: "[1,1,1]" },
      { input: "[[1,2],[3,4],[5,6]]", expected: "[1,2,3,4,5,6]" },
      { input: "[[1],[],[2]]", expected: "[1,2]" },
      { input: "[[1,3,5],[2,4,6]]", expected: "[1,2,3,4,5,6]" },
      { input: "[[1,2,3]]", expected: "[1,2,3]" },
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
    // Write your solution here
    
}`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists):
    """
    :type lists: List[ListNode]
    :rtype: ListNode
    """
    # Write your solution here
    
`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Write your solution here
        
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "26",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
Return k.`,
    examples: [
      {
        input: "nums = [1,1,2]",
        output: "2",
        explanation:
          "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k (hence they are underscores).",
      },
      {
        input: "nums = [0,0,1,1,1,2,2,3,3,4]",
        output: "5",
        explanation:
          "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively. It does not matter what you leave beyond the returned k (hence they are underscores).",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 3 * 10⁴",
      "-100 ≤ nums[i] ≤ 100",
      "nums is sorted in non-decreasing order.",
    ],
    testCases: [
      { input: "[1,1,2]", expected: "2" },
      { input: "[0,0,1,1,1,2,2,3,3,4]", expected: "5" },
      { input: "[1]", expected: "1" },
      { input: "[1,1]", expected: "1" },
      { input: "[1,2]", expected: "2" },
      { input: "[1,1,1]", expected: "1" },
      { input: "[1,2,3]", expected: "3" },
      { input: "[0,0,0]", expected: "1" },
      { input: "[1,2,2,3]", expected: "3" },
      { input: "[1,1,2,2,3,3]", expected: "3" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    // Write your solution here
    
}`,
      python: `def removeDuplicates(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "27",
    title: "Valid Sudoku",
    difficulty: "Medium",
    description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.`,
    examples: [
      {
        input:
          'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: "true",
      },
      {
        input:
          'board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: "false",
        explanation:
          "Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.",
      },
    ],
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit 1-9 or '.'.",
    ],
    testCases: [
      {
        input:
          '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        expected: "true",
      },
      {
        input:
          '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        expected: "false",
      },
      {
        input:
          '[["1","2","3",".",".",".",".",".","."],["4","5","6",".",".",".",".",".","."],["7","8","9",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]',
        expected: "true",
      },
      {
        input:
          '[["1","1",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]',
        expected: "false",
      },
      {
        input:
          '[["1",".",".",".",".",".",".",".","."],[".","1",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]',
        expected: "false",
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    // Write your solution here
    
}`,
      python: `def isValidSudoku(board):
    """
    :type board: List[List[str]]
    :rtype: bool
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "28",
    title: "Find First and Last Position of Element in Sorted Array",
    difficulty: "Medium",
    description: `Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      {
        input: "nums = [5,7,7,8,8,10], target = 8",
        output: "[3,4]",
      },
      {
        input: "nums = [5,7,7,8,8,10], target = 6",
        output: "[-1,-1]",
      },
      {
        input: "nums = [], target = 0",
        output: "[-1,-1]",
      },
    ],
    constraints: [
      "0 ≤ nums.length ≤ 10⁵",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "nums is a non-decreasing array.",
      "-10⁹ ≤ target ≤ 10⁹",
    ],
    testCases: [
      { input: "[5,7,7,8,8,10], 8", expected: "[3,4]" },
      { input: "[5,7,7,8,8,10], 6", expected: "[-1,-1]" },
      { input: "[], 0", expected: "[-1,-1]" },
      { input: "[1], 1", expected: "[0,0]" },
      { input: "[1,1], 1", expected: "[0,1]" },
      { input: "[1,2,3], 2", expected: "[1,1]" },
      { input: "[1,2,2,3], 2", expected: "[1,2]" },
      { input: "[1,2,3], 4", expected: "[-1,-1]" },
      { input: "[1,1,1,1], 1", expected: "[0,3]" },
      { input: "[1,2,3,4,5], 3", expected: "[2,2]" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
    // Write your solution here
    
}`,
      python: `def searchRange(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "29",
    title: "Word Search",
    difficulty: "Medium",
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false",
      },
    ],
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 ≤ m, n ≤ 6",
      "1 ≤ word.length ≤ 15",
      "board and word consist of only lowercase and uppercase English letters.",
    ],
    testCases: [
      {
        input:
          '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"',
        expected: "true",
      },
      {
        input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"',
        expected: "true",
      },
      {
        input:
          '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"',
        expected: "false",
      },
      { input: '[["A"]], "A"', expected: "true" },
      { input: '[["A"]], "B"', expected: "false" },
      { input: '[["A","B"],["C","D"]], "AB"', expected: "true" },
      { input: '[["A","B"],["C","D"]], "AC"', expected: "true" },
      { input: '[["A","B"],["C","D"]], "AD"', expected: "false" },
      { input: '[["A","A"],["A","A"]], "AAAA"', expected: "true" },
      {
        input: '[["A","B","C"],["D","E","F"],["G","H","I"]], "ABC"',
        expected: "true",
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
    // Write your solution here
    
}`,
      python: `def exist(board, word):
    """
    :type board: List[List[str]]
    :type word: str
    :rtype: bool
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "30",
    title: "First Missing Positive",
    difficulty: "Hard",
    description: `Given an unsorted integer array nums, return the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.`,
    examples: [
      {
        input: "nums = [1,2,0]",
        output: "3",
        explanation: "The numbers in the range [1,2] are all in the array.",
      },
      {
        input: "nums = [3,4,-1,1]",
        output: "2",
        explanation: "1 is in the array but 2 is missing.",
      },
      {
        input: "nums = [7,8,9,11,12]",
        output: "1",
        explanation: "The smallest positive integer 1 is missing.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 5 * 10⁵", "-2³¹ ≤ nums[i] ≤ 2³¹ - 1"],
    testCases: [
      { input: "[1,2,0]", expected: "3" },
      { input: "[3,4,-1,1]", expected: "2" },
      { input: "[7,8,9,11,12]", expected: "1" },
      { input: "[1]", expected: "2" },
      { input: "[2]", expected: "1" },
      { input: "[1,1]", expected: "2" },
      { input: "[1,2,3]", expected: "4" },
      { input: "[-1,-2,-3]", expected: "1" },
      { input: "[0]", expected: "1" },
      { input: "[1,2,3,4,5]", expected: "6" },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function firstMissingPositive(nums) {
    // Write your solution here
    
}`,
      python: `def firstMissingPositive(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Write your solution here
    
`,
      java: `class Solution {
    public int firstMissingPositive(int[] nums) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        // Write your solution here
        
    }
};`,
    },
  },
];
