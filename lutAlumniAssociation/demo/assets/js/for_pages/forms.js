(function() {
  $(function() {
    return $('.chosen').chosen();
  });

}).call(this);

/**
 * @name printf
 * @description 输出函数，在console界面上将对象内容输出
 *              printf(格式控制字符串, 输出参数1, … , 输出参数n);

 *
 * @param {string=} 格式控制字符串，控制输出的格式。其语法规则如下：
 *                 %d，以整型的形式输出参数，
 *                 %f，以浮点型的形式输出参数,
 *                 %s, 以字符的形式输出参数，
 *                 其他字符，原样输出*
 * @param {object} 要显示的输出参数，可以是各种类型的变量，可以有多个
 *
 * @example
 *     a=100, b=37;
 *     printf("fahr = %d, celsius = %d\n", a, b);
 *     结果为：fahr=100, celsius=37;
 * @example
 *     a=3, b=a*a;
 *     printf("%d=%d*%d, b, a, a);
 *     结果为：9=3*3;
 * @example
 *     printf("%s\n", "hello world");
 *     结果为：hello world;
 * @example
 *     printf("hello world\n");
 *     结果为：hello world;
 */

/**
 * @name scanf
 * @description 输入函数，在console界面上将对象内容输入
 *              scanf(格式控制字符串, 输入参数1, … , 输入参数n);

 *
 * @param {string=} 格式控制字符串，与printf()函数的用法一样
 * @param {object} 要显示的输出参数，可以是各种类型的变量，可以有多个
 *
 * @example
 *     a=100, b=37;
 *     printf("fahr = %d, celsius = %d\n", a, b);
 *     结果为：fahr=100, celsius=37;
 * @example
 *     a=3, b=a*a;
 *     printf("%d=%d*%d, b, a, a);
 *     结果为：9=3*3;
 * @example
 *     printf("%s\n", "hello world");
 *     结果为：hello world;
 * @example
 *     printf("hello world\n");
 *     结果为：hello world;
 */