/*
 * @lc app=leetcode.cn id=640 lang=javascript
 *
 * [640] 求解方程
 *
 * https://leetcode-cn.com/problems/solve-the-equation/description/
 *
 * algorithms
 * Medium (39.53%)
 * Likes:    28
 * Dislikes: 0
 * Total Accepted:    1.7K
 * Total Submissions: 4.2K
 * Testcase Example:  '"x+5-3+x=6+x-2"'
 *
 * 求解一个给定的方程，将x以字符串"x=#value"的形式返回。该方程仅包含'+'，' - '操作，变量 x 和其对应系数。
 *
 * 如果方程没有解，请返回“No solution”。
 *
 * 如果方程有无限解，则返回“Infinite solutions”。
 *
 * 如果方程中只有一个解，要保证返回值 x 是一个整数。
 *
 * 示例 1：
 *
 * 输入: "x+5-3+x=6+x-2"
 * 输出: "x=2"
 *
 *
 * 示例 2:
 *
 * 输入: "x=x"
 * 输出: "Infinite solutions"
 *
 *
 * 示例 3:
 *
 * 输入: "2x=x"
 * 输出: "x=0"
 *
 *
 * 示例 4:
 *
 * 输入: "2x+3x-6x=x+2"
 * 输出: "x=-1"
 *
 *
 * 示例 5:
 *
 * 输入: "x=x+2"
 * 输出: "No solution"
 *
 *
 */

// @lc code=start
/**
 * @param {string} equation
 * @return {string}
 */
var solveEquation = function(equation) {
  equation = equation.replace(/ /g, '');
  const [left, right] = equation.split('=');
  factorOfXInLeft = findFactorsOfX(left);
  factorOfXInRight = findFactorsOfX(right);
  factorOfX = sum(factorOfXInLeft) - sum(factorOfXInRight);

  numberInLeft = findNumber(left);
  numberInRight = findNumber(right);
  number = sum(numberInRight) - sum(numberInLeft);

  if (factorOfX === 0 && number !== 0) {
    return 'No solution';
  }
  if (factorOfX === 0 && number === 0) {
    return 'Infinite solutions';
  }
  return `x=${number / factorOfX}`;
};

function findFactorsOfX(expression) {
  const result = [];
  let str = '';
  for (let c of expression) {
    if (c === 'x') {
      if (str === '') {
        result.push(1);
      } else {
        if (str === '+' || str === '-') {
          str += '1';
        }
        result.push(parseInt(str));
        str = '';
      }
      continue;
    }
    if (c === '+' || c === '-') {
      str = '';
    }
    str += c;
  }
  return result;
}

function findNumber(expression) {
  const result = [];
  let str = '';
  for (let c of expression) {
    if (c === 'x') {
      str = '';
      continue;
    }
    if (c === '+' || c === '-') {
      if (str.length > 0) {
        result.push(parseInt(str));
        str = '';
      }
    }
    str += c;
  }
  if (str.length > 0) {
    result.push(parseInt(str));
  }
  return result;
}

function sum(listOfNumber) {
  let result = 0;
  for (let item of listOfNumber) {
    result += item;
  }
  return result;
}
// @lc code=end
