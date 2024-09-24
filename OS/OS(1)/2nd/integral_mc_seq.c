// integral_mc_seq.c: Monte Carlo integration - sequential code
// https://en.wikipedia.org/wiki/Monte_Carlo_integration

/*
# Ξηρομερίτης Άγγελος,           1088601
# Μπαλής Γεώργιος,	             1040996 (παλαιός:235230)
# Κωστόπουλος Στέφανος Ιωάννης,  1093404
# Ιωάννης Καλδίρης,	             1080428
*/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <sys/time.h>

double get_wtime(void) {
  struct timeval t;
  gettimeofday(&t, NULL);
  return (double)t.tv_sec + (double)t.tv_usec * 1.0e-6;
}

inline double f(double x) {
  return sin(cos(x));
}

// WolframAlpha: integral sin(cos(x)) from 0 to 1 = 0.738643
// 0.73864299803689018
// 0.7386429980368901838000902905852160417480209422447648518714116299

int main(int argc, char *argv[]) {
  double a = 0.0;
  double b = 1.0;
  unsigned long n = 24e7;  // or e8
  const double h = (b-a)/n;
  const double ref = 0.73864299803689018;
  const long tseed = 10;
  double res = 0;
  double t0, t1;

  if (argc == 2) {
    n = atol(argv[1]);
  }

  srand48(tseed);

  t0 = get_wtime();
  for (unsigned long i = 0; i < n; i++) {
    double xi;
    xi = drand48();
    res += f(xi);
  }
  res *= h;
  t1 = get_wtime();
  
  printf("\n--- Sequential execution result ---\n");
  
  printf("\nResult=%.16f \nError=%e \nRel.Error=%e \nTime=%lf seconds\n\n",
         res, fabs(res-ref), fabs(res-ref)/ref, t1-t0);
  return 0;
}
