(function() {
  $(function() {
    return $('.chosen').chosen();
  });

}).call(this);

/**
 * @name printf
 * @description �����������console�����Ͻ������������
 *              printf(��ʽ�����ַ���, �������1, �� , �������n);

 *
 * @param {string=} ��ʽ�����ַ�������������ĸ�ʽ�����﷨�������£�
 *                 %d�������͵���ʽ���������
 *                 %f���Ը����͵���ʽ�������,
 *                 %s, ���ַ�����ʽ���������
 *                 �����ַ���ԭ�����*
 * @param {object} Ҫ��ʾ����������������Ǹ������͵ı����������ж��
 *
 * @example
 *     a=100, b=37;
 *     printf("fahr = %d, celsius = %d\n", a, b);
 *     ���Ϊ��fahr=100, celsius=37;
 * @example
 *     a=3, b=a*a;
 *     printf("%d=%d*%d, b, a, a);
 *     ���Ϊ��9=3*3;
 * @example
 *     printf("%s\n", "hello world");
 *     ���Ϊ��hello world;
 * @example
 *     printf("hello world\n");
 *     ���Ϊ��hello world;
 */

/**
 * @name scanf
 * @description ���뺯������console�����Ͻ�������������
 *              scanf(��ʽ�����ַ���, �������1, �� , �������n);

 *
 * @param {string=} ��ʽ�����ַ�������printf()�������÷�һ��
 * @param {object} Ҫ��ʾ����������������Ǹ������͵ı����������ж��
 *
 * @example
 *     a=100, b=37;
 *     printf("fahr = %d, celsius = %d\n", a, b);
 *     ���Ϊ��fahr=100, celsius=37;
 * @example
 *     a=3, b=a*a;
 *     printf("%d=%d*%d, b, a, a);
 *     ���Ϊ��9=3*3;
 * @example
 *     printf("%s\n", "hello world");
 *     ���Ϊ��hello world;
 * @example
 *     printf("hello world\n");
 *     ���Ϊ��hello world;
 */